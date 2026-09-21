import 'server-only';

import { z } from 'zod';

/** Error codes used for logging — never user-supplied strings. */
export const CONTACT_ERROR_CODES = {
  PROVIDER_FAILED: 'contact_provider_failed',
  UNEXPECTED: 'contact_unexpected',
} as const;

/** Field length caps shared by the schema, the form, and abuse protection. */
export const CONTACT_FIELD_LIMITS = {
  fullName: 100,
  email: 254,
  message: 5000,
} as const;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: 'Full name is required' })
    .max(CONTACT_FIELD_LIMITS.fullName, {
      message: `Full name must be ${CONTACT_FIELD_LIMITS.fullName} characters or fewer`,
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(CONTACT_FIELD_LIMITS.email, {
      message: `Email must be ${CONTACT_FIELD_LIMITS.email} characters or fewer`,
    })
    .email('Please enter a valid email address'),
  message: z
    .string()
    .trim()
    .min(1, { message: 'Message is required' })
    .max(CONTACT_FIELD_LIMITS.message, {
      message: `Message must be ${CONTACT_FIELD_LIMITS.message} characters or fewer`,
    }),
  captcha: z.string().min(1, { message: 'Captcha is required' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
