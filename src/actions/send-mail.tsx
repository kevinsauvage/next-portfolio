'use server';

import emailjs from '@emailjs/nodejs';
import { z } from 'zod';

const serviceId = process.env.email_js_service_id as string;
const publicKey = process.env.email_js_public_key as string;
const privateKey = process.env.email_js_provate_key as string;
const templateId = process.env.email_js_template_id as string;

const keyParameters = { privateKey, publicKey };

const sendMailSchema = z.object({
  email: z.string().email(),
  feedback: z.string().optional(),
  fullName: z.string().min(1, { message: 'Full name is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  phone: z.string().optional(),
  subject: z.string().optional(),
});

type fieldErrors = {
  email?: Array<string> | undefined;
  error?: Array<string> | undefined;
  feedback?: Array<string> | undefined;
  fullName?: Array<string> | undefined;
  message?: Array<string> | undefined;
  phone?: Array<string> | undefined;
  subject?: Array<string> | undefined;
};

export async function sendMail(
  previousState: unknown,
  formData: FormData,
): Promise<fieldErrors | undefined> {
  const result = sendMailSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result?.success) return result.error.formErrors.fieldErrors;

  try {
    await emailjs.send(serviceId, templateId, result.data, keyParameters);
  } catch (error) {
    console.error('FAILED...', error);
    return { feedback: ['Something went wrong. Please try again.'] };
  }
}
