import { z } from 'zod';

const envSchema = z.object({
  email_js_service_id: z.string().min(1),
  email_js_public_key: z.string().min(1),
  email_js_private_key: z.string().min(1),
  email_js_template_id: z.string().min(1),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  UMAMI_ID: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
