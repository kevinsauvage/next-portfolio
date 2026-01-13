import { z } from 'zod';

const serverEnvSchema = z.object({
  email_js_service_id: z.string().min(1),
  email_js_public_key: z.string().min(1),
  email_js_private_key: z.string().min(1),
  email_js_template_id: z.string().min(1),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  UMAMI_ID: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;
let cachedPublicEnv: PublicEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (typeof globalThis !== 'undefined') {
    throw new Error('getServerEnv must only be called on the server');
  }
  if (cachedServerEnv) return cachedServerEnv;

  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid server environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
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
      `Invalid public environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
    );
  }
  cachedPublicEnv = parsed.data;
  return cachedPublicEnv;
}
