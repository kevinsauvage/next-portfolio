'use server';

import emailjs from '@emailjs/nodejs';

const serviceId = process.env['email_js_service_id'] as string;
const publicKey = process.env['email_js_public_key'] as string;
const privateKey = process.env['email_js_private_key'] as string;
const templateId = process.env['email_js_template_id'] as string;

const keyParameters = { privateKey, publicKey };

async function validateCaptcha(captchaToken: string): Promise<boolean> {
  const minimumCaptchaScore = 0.7;
  const secretKey = process.env['RECAPTCHA_SECRET_KEY'] || '';
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
    console.error('FAILED...', error);
    return { success: false, error: 'Failed to send email' };
  }
}
