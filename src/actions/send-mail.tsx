'use server';

import { env } from '@/lib/env';
import { logError } from '@/lib/error-tracking';

import emailjs from '@emailjs/nodejs';

const serviceId = env.email_js_service_id;
const publicKey = env.email_js_public_key;
const privateKey = env.email_js_private_key;
const templateId = env.email_js_template_id;

const keyParameters = { privateKey, publicKey };

async function validateCaptcha(captchaToken: string): Promise<boolean> {
  const minimumCaptchaScore = 0.7;
  const secretKey = env.RECAPTCHA_SECRET_KEY;
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
    const valid = await validateCaptcha(data.captcha);
    if (!valid) {
      return { success: false, error: 'Captcha validation failed' };
    }

    await emailjs.send(serviceId, templateId, data, keyParameters);
    return { success: true };
  } catch (error) {
    logError(new Error('Failed to send email'), { error });
    return { success: false, error: 'Failed to send email' };
  }
}
