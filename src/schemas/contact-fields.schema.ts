import { z } from 'zod';

/**
 * Field validation shared by the server action and the client form so both
 * surfaces produce identical messages. Kept free of `server-only` so the form
 * can validate before hitting the network.
 */

/** Field length caps shared by the schema, the form, and abuse protection. */
export const CONTACT_FIELD_LIMITS = {
  fullName: 100,
  email: 254,
  message: 5000,
} as const;

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

export type ContactFieldValues = z.infer<typeof contactFieldsSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactFieldValues, string>>;

/** Collect the first error message for each field from a failed parse. */
export const collectFieldErrors = (
  issues: ReadonlyArray<{ message: string; path: PropertyKey[] }>
): ContactFieldErrors => {
  const errors: ContactFieldErrors = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (key === 'fullName' && !errors.fullName) errors.fullName = issue.message;
    else if (key === 'email' && !errors.email) errors.email = issue.message;
    else if (key === 'message' && !errors.message) errors.message = issue.message;
  }
  return errors;
};
