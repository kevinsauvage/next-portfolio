'use server';

import { headers } from 'next/headers';

import { getServerEnv } from '@/lib/env';
import { logError } from '@/lib/error-tracking';
import { checkRateLimit } from '@/lib/rate-limit';
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

const MINIMUM_CAPTCHA_SCORE = 0.7;
/** Secondary throttle so one address cannot be flooded from many client IPs. */
const EMAIL_WINDOW_MS = 10 * 60_000;
const MAX_EMAIL_REQUESTS_PER_WINDOW = 3;
const CAPTCHA_FAILED_MESSAGE = 'Captcha validation failed. Please try again.';

/** Hash the address so the rate-limit key carries no PII. */
function hashEmail(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex').slice(0, 32);
}

async function validateCaptcha(captchaToken: string, secretKey: string): Promise<boolean> {
  const data = new FormData();
  data.append('secret', secretKey);
  data.append('response', captchaToken);
  const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    body: data,
    method: 'POST',
  });
  const response: unknown = await captchaResponse.json();
  if (typeof response !== 'object' || response === null) return false;

  const { success, score } = response as { success?: unknown; score?: unknown };
  return success === true && typeof score === 'number' && score >= MINIMUM_CAPTCHA_SCORE;
}

/** Client IP derived from proxy headers, or `null` when none is present. */
async function getClientKey(): Promise<string | null> {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || headerList.get('x-real-ip')?.trim();
  return ip || null;
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

export async function sendMail(data: {
  fullName: string;
  email: string;
  message: string;
  captcha: string;
}): Promise<{ success: boolean; error?: string; fieldErrors?: Record<string, string> }> {
  try {
    const parsed = contactFormSchema.safeParse(data);
    if (!parsed.success) {
      const formatted = parsed.error.format();
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: {
          fullName: formatted.fullName?._errors[0] ?? '',
          email: formatted.email?._errors[0] ?? '',
          message: formatted.message?._errors[0] ?? '',
          captcha: formatted.captcha?._errors[0] ?? '',
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

const CONTACT_FIELDS = ['fullName', 'email', 'message'] as const;

function toFieldErrors(source: Record<string, string>): ContactFormState['fieldErrors'] {
  const fieldErrors: ContactFormState['fieldErrors'] = {};
  if (source['fullName']) fieldErrors.fullName = source['fullName'];
  if (source['email']) fieldErrors.email = source['email'];
  if (source['message']) fieldErrors.message = source['message'];
  if (source['captcha']) fieldErrors.captcha = source['captcha'];
  return fieldErrors;
}

/**
 * Applies the per-IP and per-address throttles. Returns an error state when a
 * limit is hit (or when no client IP can be derived in production), else null.
 */
async function enforceRateLimits(
  clientKey: string | null,
  email: string
): Promise<ContactFormState | null> {
  // Without a client IP every caller collapses into one shared bucket (and the
  // key is trivially spoofable), so fail closed in production. Local dev has no
  // proxy headers, so it falls back to a single local bucket.
  if (!clientKey && process.env.NODE_ENV === 'production') {
    return {
      status: 'error',
      message: 'We could not verify your request. Please try again later.',
      fieldErrors: {},
    };
  }

  const ipLimit = await checkRateLimit(`contact:ip:${clientKey ?? 'local'}`);
  if (!ipLimit.allowed) {
    return {
      status: 'error',
      message: `Too many messages sent. Please try again in ${ipLimit.retryAfterSeconds} seconds.`,
      fieldErrors: {},
    };
  }

  const emailLimit = await checkRateLimit(`contact:email:${hashEmail(email)}`, {
    max: MAX_EMAIL_REQUESTS_PER_WINDOW,
    windowMs: EMAIL_WINDOW_MS,
  });
  if (!emailLimit.allowed) {
    return {
      status: 'error',
      message: `Too many messages sent from this address. Please try again in ${emailLimit.retryAfterSeconds} seconds.`,
      fieldErrors: {},
    };
  }

  return null;
}

export async function sendMailAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const getFieldString = (field: string): string => {
    const value = formData.get(field);
    return typeof value === 'string' ? value : '';
  };
  try {
    const payload = Object.fromEntries(
      [...CONTACT_FIELDS, 'captcha'].map(field => [field, getFieldString(field)])
    ) as { fullName: string; email: string; message: string; captcha: string };

    const limited = await enforceRateLimits(await getClientKey(), payload.email);
    if (limited) return limited;

    const result = await sendMail(payload);

    if (result.success) {
      return {
        status: 'success',
        message:
          "Your message has been sent successfully. I'll get back to you as soon as possible.",
        fieldErrors: {},
      };
    }

    if (result.fieldErrors) {
      return {
        status: 'error',
        message: result.error ?? 'Please correct the errors in the form.',
        fieldErrors: toFieldErrors(result.fieldErrors),
      };
    }

    return {
      status: 'error',
      message:
        result.error ?? 'An error occurred while sending your message. Please try again later.',
      fieldErrors: {},
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
