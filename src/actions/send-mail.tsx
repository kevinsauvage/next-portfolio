'use server';

import emailjs from '@emailjs/nodejs';
import { z } from 'zod';

const serviceId = process.env.email_js_service_id as string;
const publicKey = process.env.email_js_public_key as string;
const privateKey = process.env.email_js_provate_key as string;
const templateId = process.env.email_js_template_id as string;

const keyParameters = { privateKey, publicKey };

async function validateCaptcha(captchaToken: string): Promise<boolean> {
  const minimumCaptchaScore = 0.7;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || '';
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

const sendMailSchema = z.object({
  captcha: z.string().optional(),
  email: z.string().email(),
  feedback: z.string().optional(),
  fullName: z.string().min(1, { message: 'Full name is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  phone: z.string().optional(),
  subject: z.string().optional(),
});

type fieldErrors = {
  email?: Array<string> ;
  error?: Array<string>;
  feedback?: Array<string>;
  fullName?: Array<string>;
  message?: Array<string>;
  phone?: Array<string>;
  subject?: Array<string>;
};

export async function sendMail(
  previousState: unknown,
  formData: FormData,
): Promise<fieldErrors | undefined> {
  const result = sendMailSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result?.success) return result.error.formErrors.fieldErrors;

  const valid = await validateCaptcha(result.data.captcha ?? '');

  if (!valid) {
    return { feedback: ['Captcha validation failed. Please try again later.'] };
  }

  try {
    await emailjs.send(serviceId, templateId, result.data, keyParameters);
  } catch (error) {
    console.error('FAILED...', error);
    return { feedback: ['Something went wrong. Please try again.'] };
  }
}
