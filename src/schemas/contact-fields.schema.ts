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

/** reCAPTCHA v3 action name; the server rejects tokens minted for any other action. */
export const CONTACT_CAPTCHA_ACTION = 'contactMessage';

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

export const CONTACT_FIELDS = ['fullName', 'email', 'message'] as const;

export type ContactFieldName = (typeof CONTACT_FIELDS)[number];

export const isContactField = (key: unknown): key is ContactFieldName =>
  CONTACT_FIELDS.some(field => field === key);

export type ContactFieldValues = z.infer<typeof contactFieldsSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactFieldValues, string>>;

/** Collect the first error message for each field from a failed parse. */
export const collectFieldErrors = (
  issues: ReadonlyArray<{ message: string; path: PropertyKey[] }>
): ContactFieldErrors => {
  const errors: ContactFieldErrors = {};
  for (const issue of issues) {
    const key = issue.path[0];
    // eslint-disable-next-line security/detect-object-injection -- key narrowed to ContactFieldName
    if (isContactField(key) && !errors[key]) errors[key] = issue.message;
  }
  return errors;
};
