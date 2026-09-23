import 'server-only';

import { contactFieldsSchema } from './contact-fields.schema';

export { CONTACT_FIELD_LIMITS } from './contact-fields.schema';

import { z } from 'zod';

/** Error codes used for logging — never user-supplied strings. */
export const CONTACT_ERROR_CODES = {
  PROVIDER_FAILED: 'contact_provider_failed',
  UNEXPECTED: 'contact_unexpected',
} as const;

export const contactFormSchema = contactFieldsSchema.extend({
  captcha: z.string().min(1, { message: 'Captcha is required' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
