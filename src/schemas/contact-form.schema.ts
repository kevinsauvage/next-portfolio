import 'server-only';

import { z } from 'zod';

// Server-side validation schema (not bundled to client)
export const contactFormSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Please enter a valid email address'),
  message: z.string().min(1, { message: 'Message is required' }),
  captcha: z.string().min(1, { message: 'Captcha is required' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
