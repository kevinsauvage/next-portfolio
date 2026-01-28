'use server';

import { getServerEnv } from '@/lib/env';
import { logError } from '@/lib/error-tracking';
import { contactFormSchema } from '@/schemas/contact-form.schema';

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

async function validateCaptcha(captchaToken: string, secretKey: string): Promise<boolean> {
  const minimumCaptchaScore = 0.7;
  const data = new FormData();
  data.append('secret', secretKey);
  data.append('response', captchaToken);
  const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    body: data,
    method: 'POST',
  });
  const response = await captchaResponse.json();
  return response.score && response.score >= minimumCaptchaScore;
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
      parsed.data,
      keyParameters
    );
    return { success: true };
  } catch (error) {
    logError(new Error('Failed to send email'), { error });
    return { success: false, error: 'Failed to send email' };
  }
}

export async function sendMailAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const fullName = String(formData.get('fullName') ?? '');
    const email = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');
    const captcha = String(formData.get('captcha') ?? '');

    const result = await sendMail({ fullName, email, message, captcha });

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
        fieldErrors: Object.fromEntries(
          (['fullName', 'email', 'message'] as const)
            .map(field => {
              const value = result.fieldErrors?.[field];
              return value ? [field, value] : null;
            })
            .filter((entry): entry is [string, string] => entry !== null)
        ) as ContactFormState['fieldErrors'],
      };
    }

    return {
      status: 'error',
      message:
        result.error ?? 'An error occurred while sending your message. Please try again later.',
      fieldErrors: {},
    };
  } catch (error) {
    logError(new Error('Failed to send email'), { error });
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.',
      fieldErrors: {},
    };
  }
}
