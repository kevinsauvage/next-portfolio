'use server';

import { getServerEnv } from '@/lib/env';
import { logError } from '@/lib/error-tracking';

import emailjs from '@emailjs/nodejs';

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
}): Promise<{ success: boolean; error?: string }> {
  try {
    const env = getServerEnv();
    const valid = await validateCaptcha(data.captcha, env.RECAPTCHA_SECRET_KEY);
    if (!valid) {
      return { success: false, error: 'Captcha validation failed' };
    }

    const keyParameters = {
      privateKey: env.email_js_private_key,
      publicKey: env.email_js_public_key,
    };
    await emailjs.send(env.email_js_service_id, env.email_js_template_id, data, keyParameters);
    return { success: true };
  } catch (error) {
    logError(new Error('Failed to send email'), { error });
    return { success: false, error: 'Failed to send email' };
  }
}
