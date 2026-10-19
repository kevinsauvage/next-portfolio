'use server';

import { headers } from 'next/headers';

import { getServerEnv } from '@/lib/env';
import { logError } from '@/lib/observability/error-tracking';
import { checkRateLimit } from '@/lib/security/rate-limit';
import {
  collectFieldErrors,
  CONTACT_CAPTCHA_ACTION,
  formDataString,
  readContactFields,
} from '@/schemas/contact-fields';
import { CONTACT_ERROR_CODES, contactFormSchema } from '@/schemas/contact-form.schema';

import emailjs from '@emailjs/nodejs';
import { createHash } from 'node:crypto';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors: {
    fullName?: string;
    email?: string;
    message?: string;
    captcha?: string;
  };
};

type SendMailResult = {
  success: boolean;
  error?: string;
  fieldErrors?: ContactFormState['fieldErrors'];
};

const MINIMUM_CAPTCHA_SCORE = 0.7;
const CAPTCHA_TIMEOUT_MS = 5000;
/** Secondary throttle so one address cannot be flooded from many client IPs. */
const EMAIL_WINDOW_MS = 10 * 60_000;
const MAX_EMAIL_REQUESTS_PER_WINDOW = 3;
const CAPTCHA_FAILED_MESSAGE = 'Captcha validation failed. Please try again.';

/** Hash the address so the rate-limit key carries no PII. */
function hashEmail(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex').slice(0, 32);
}

/**
 * Client IP, or `null` when none is present. `x-real-ip` is set by the platform
 * proxy; the first `x-forwarded-for` entry is the fallback.
 */
async function getClientKey(): Promise<string | null> {
  const headerList = await headers();
  const ip =
    headerList.get('x-real-ip')?.trim() || headerList.get('x-forwarded-for')?.split(',')[0]?.trim();
  return ip || null;
}

/** Host the visitor reached us on (no port), used to pin the reCAPTCHA hostname. */
async function getRequestHost(): Promise<string | null> {
  const headerList = await headers();
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host');
  return host?.split(':')[0]?.toLowerCase() || null;
}

async function validateCaptcha(captchaToken: string, secretKey: string): Promise<boolean> {
  const data = new FormData();
  data.append('secret', secretKey);
  data.append('response', captchaToken);
  const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    body: data,
    method: 'POST',
    signal: AbortSignal.timeout(CAPTCHA_TIMEOUT_MS),
  });
  if (!captchaResponse.ok) return false;

  const response: unknown = await captchaResponse.json();
  if (typeof response !== 'object' || response === null) return false;

  const { success, score, action, hostname } = response as Record<string, unknown>;
  if (success !== true || typeof score !== 'number' || score < MINIMUM_CAPTCHA_SCORE) return false;
  // A token minted for another action or site must not unlock this form.
  if (action !== CONTACT_CAPTCHA_ACTION) return false;

  const expectedHost = await getRequestHost();
  // Fail closed: when a host is derivable, Google must report that same host.
  if (!expectedHost) return true;
  return typeof hostname === 'string' && hostname.toLowerCase() === expectedHost;
}

async function dispatchEmail(
  env: ReturnType<typeof getServerEnv>,
  data: { email: string; fullName: string; message: string }
): Promise<void> {
  await emailjs.send(
    env.email_js_service_id,
    env.email_js_template_id,
    {
      email: data.email,
      fullName: data.fullName,
      message: data.message,
    },
    {
      privateKey: env.email_js_private_key,
      publicKey: env.email_js_public_key,
    }
  );
}

/** Per-address throttle; only reached after the captcha passed so it cannot be abused to lock others out. */
async function emailLimitMessage(email: string): Promise<string | null> {
  const limit = await checkRateLimit(`contact:email:${hashEmail(email)}`, {
    max: MAX_EMAIL_REQUESTS_PER_WINDOW,
    windowMs: EMAIL_WINDOW_MS,
  });
  return limit.allowed
    ? null
    : `Too many messages sent from this address. Please try again in ${limit.retryAfterSeconds} seconds.`;
}

async function sendMail(data: {
  fullName: string;
  email: string;
  message: string;
  captcha: string;
}): Promise<SendMailResult> {
  try {
    const parsed = contactFormSchema.safeParse(data);
    if (!parsed.success) {
      const captchaIssue = parsed.error.issues.find(issue => issue.path[0] === 'captcha');
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: {
          ...collectFieldErrors(parsed.error.issues),
          ...(captchaIssue && { captcha: captchaIssue.message }),
        },
      };
    }

    const env = getServerEnv();
    const valid = await validateCaptcha(parsed.data.captcha, env.RECAPTCHA_SECRET_KEY);
    if (!valid) {
      return {
        success: false,
        error: 'Captcha validation failed',
        fieldErrors: { captcha: CAPTCHA_FAILED_MESSAGE },
      };
    }

    const throttled = await emailLimitMessage(parsed.data.email);
    if (throttled) return { success: false, error: throttled };

    await dispatchEmail(env, parsed.data);
    return { success: true };
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error('Unknown email error'),
      CONTACT_ERROR_CODES.PROVIDER_FAILED
    );
    return { success: false, error: 'Failed to send email' };
  }
}

/**
 * Per-IP throttle. Returns the error message when the limit is hit (or when no
 * client IP can be derived in production), else null.
 */
async function enforceIpLimit(clientKey: string | null): Promise<string | null> {
  // Without a client IP every caller collapses into one shared bucket (and the
  // key is trivially spoofable), so fail closed in production. Local dev has no
  // proxy headers, so it falls back to a single local bucket.
  if (!clientKey && process.env.NODE_ENV === 'production') {
    return 'We could not verify your request. Please try again later.';
  }

  const ipLimit = await checkRateLimit(`contact:ip:${clientKey ?? 'local'}`);
  if (!ipLimit.allowed) {
    return `Too many messages sent. Please try again in ${ipLimit.retryAfterSeconds} seconds.`;
  }

  return null;
}

export async function sendMailAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const payload = {
      ...readContactFields(formData),
      captcha: formDataString(formData, 'captcha'),
    };

    const limitMessage = await enforceIpLimit(await getClientKey());
    if (limitMessage) {
      return { status: 'error', message: limitMessage, fieldErrors: {} };
    }

    const result = await sendMail(payload);

    if (result.success) {
      return {
        status: 'success',
        message:
          "Your message has been sent successfully. I'll get back to you as soon as possible.",
        fieldErrors: {},
      };
    }

    return {
      status: 'error',
      message:
        result.error ??
        (result.fieldErrors
          ? 'Please correct the errors in the form.'
          : 'An error occurred while sending your message. Please try again later.'),
      fieldErrors: result.fieldErrors ?? {},
    };
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error('Unknown contact form error'),
      CONTACT_ERROR_CODES.UNEXPECTED
    );
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.',
      fieldErrors: {},
    };
  }
}
