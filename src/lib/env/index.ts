import 'server-only';

import { GA4_MEASUREMENT_ID_PATTERN, GTM_ID_PATTERN } from '../analytics/ids';

import { z } from 'zod';

const serverEnvSchema = z.object({
  email_js_service_id: z.string().min(1),
  email_js_public_key: z.string().min(1),
  email_js_private_key: z.string().min(1),
  email_js_template_id: z.string().min(1),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  // GA4 measurement id for the Google tag this site loads directly, read
  // server-side and passed to the loader. Optional so a deployment without
  // analytics still boots; a malformed value is rejected here and again in
  // `normalizeMeasurementId` before it reaches the script URL.
  GA4_MEASUREMENT_ID: z
    .string()
    .regex(GA4_MEASUREMENT_ID_PATTERN, 'GA4_MEASUREMENT_ID must look like G-ABC1234')
    .optional(),
  // Container id, read server-side and passed to the GTM loader. Optional so a
  // deployment without analytics still boots; a malformed value is rejected here
  // and again in `normalizeGtmId` before it reaches the script URL.
  GTM_ID: z.string().regex(GTM_ID_PATTERN, 'GTM_ID must look like GTM-ABC1234').optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;
let cachedPublicEnv: PublicEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (globalThis.window !== undefined) {
    throw new Error('getServerEnv must only be called on the server');
  }
  if (cachedServerEnv) return cachedServerEnv;

  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid server environment variables: ${JSON.stringify(z.flattenError(parsed.error).fieldErrors)}`
    );
  }
  cachedServerEnv = parsed.data;
  return cachedServerEnv;
}

export function getPublicEnv(): PublicEnv {
  if (cachedPublicEnv) return cachedPublicEnv;
  const parsed = publicEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid public environment variables: ${JSON.stringify(z.flattenError(parsed.error).fieldErrors)}`
    );
  }
  cachedPublicEnv = parsed.data;
  return cachedPublicEnv;
}
