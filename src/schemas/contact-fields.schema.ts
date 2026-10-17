import { CONTACT_FIELD_LIMITS } from './contact-fields';

import { z } from 'zod';

/**
 * The zod schema for the contact fields, shared by the server action and the
 * client form so both surfaces produce identical messages.
 *
 * Everything that does not need zod lives in `contact-fields.ts`, which the form
 * imports; this module is only loaded once validation actually runs, so zod
 * stays out of the initial bundle.
 */

export const contactFieldsSchema = z.object({
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
});
