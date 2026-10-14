// @ts-check
/** @typedef {import('./csp.config').CSPDirectives} CSPDirectives */

/** Hosts allowed to run scripts (in addition to nonce'd inline scripts). */
const SCRIPT_SRC_HOSTS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://www.google.com',
  'https://www.gstatic.com',
];

/** Vercel's preview toolbar; never needed (or allowed) on production. */
const VERCEL_PREVIEW_HOST = 'https://vercel.live';

const isVercelPreview = () => process.env.VERCEL_ENV === 'preview';

/**
 * Every directive except `script-src`, which depends on the per-request nonce
 * and is built in {@link buildCsp}. Sentry traffic goes through the same-origin
 * `/monitoring` tunnel, and fonts are self-hosted by `next/font`.
 *
 * @type {CSPDirectives}
 */
export const cspDirectives = {
  'default-src': ["'self'"],
  // Allow Web Workers created from same-origin and blob: URLs
  'worker-src': ["'self'", 'blob:'],
  // Legacy fallback for some browsers
  'child-src': ["'self'", 'blob:'],
  'connect-src': [
    "'self'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://www.google.com',
    'https://www.gstatic.com',
  ],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'style-src': ["'self'", "'unsafe-inline'"],
  'font-src': ["'self'", 'data:'],
  'frame-src': ['https://www.googletagmanager.com', 'https://www.google.com'],
  'frame-ancestors': ["'self'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'object-src': ["'none'"],
  other: ['upgrade-insecure-requests'],
};

/**
 * Builds the CSP header value with a per-request nonce for inline scripts.
 *
 * When a nonce is provided, `'unsafe-inline'` is dropped from `script-src`
 * (browsers ignore it when a nonce/hash is present anyway). Without a nonce
 * the policy falls back to `'unsafe-inline'`.
 *
 * `'unsafe-eval'` is only added outside production, where React tooling and
 * HMR still need it; the production header must not carry it.
 *
 * @param {string} [nonce]
 * @returns {string}
 */
export function buildCsp(nonce) {
  const devEval = process.env.NODE_ENV !== 'production' ? ["'unsafe-eval'"] : [];
  const scriptSrc = [
    "'self'",
    nonce ? `'nonce-${nonce}'` : "'unsafe-inline'",
    ...devEval,
    ...SCRIPT_SRC_HOSTS,
    ...(isVercelPreview() ? [VERCEL_PREVIEW_HOST] : []),
  ];
  const directives = isVercelPreview()
    ? {
        ...cspDirectives,
        'frame-src': [...(cspDirectives['frame-src'] ?? []), VERCEL_PREVIEW_HOST],
        'connect-src': [...(cspDirectives['connect-src'] ?? []), VERCEL_PREVIEW_HOST],
      }
    : cspDirectives;
  return cspToString({ ...directives, 'script-src': scriptSrc });
}

/**
 * @param {CSPDirectives} directives
 * @returns {string}
 */
export function cspToString(directives) {
  const parts = [];
  for (const [name, values] of Object.entries(directives)) {
    if (name === 'other') {
      parts.push(values.join(' '));
    } else {
      parts.push(`${name} ${values.join(' ')}`);
    }
  }
  return parts.join('; ');
}
