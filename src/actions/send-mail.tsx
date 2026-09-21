'use server';

import { headers } from 'next/headers';

import { getServerEnv } from '@/lib/env';
import { logError } from '@/lib/error-tracking';
import { checkRateLimit } from '@/lib/rate-limit';
import { CONTACT_ERROR_CODES, contactFormSchema } from '@/schemas/contact-form.schema';

import emailjs from '@emailjs/nodejs';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors: {
    fullName?: string;
    email?: string;
    message?: string;
  };
};

const MINIMUM_CAPTCHA_SCORE = 0.7;

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

/** Best-effort client key for rate limiting. */
async function getClientKey(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || headerList.get('x-real-ip') || 'unknown';
  return ip;
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
      return { success: false, error: 'Captcha validation failed' };
    }

    const keyParameters = {
      privateKey: env.email_js_private_key,
      publicKey: env.email_js_public_key,
    };
    await emailjs.send(
      env.email_js_service_id,
      env.email_js_template_id,
      {
        email: parsed.data.email,
        fullName: parsed.data.fullName,
        message: parsed.data.message,
      },
      keyParameters
    );
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
  return fieldErrors;
}

export async function sendMailAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const { allowed, retryAfterSeconds } = checkRateLimit(await getClientKey());
    if (!allowed) {
      return {
        status: 'error',
        message: `Too many messages sent. Please try again in ${retryAfterSeconds} seconds.`,
        fieldErrors: {},
      };
    }

    const payload = Object.fromEntries(
      [...CONTACT_FIELDS, 'captcha'].map(field => [field, String(formData.get(field) ?? '')])
    ) as { fullName: string; email: string; message: string; captcha: string };

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
