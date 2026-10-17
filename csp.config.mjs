// @ts-check
/** @typedef {import('./csp.config').CSPDirectives} CSPDirectives */

/** Hosts allowed to run scripts (in addition to inline scripts). */
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
 * Every directive except `script-src`, which is built in {@link buildCsp}.
 * Sentry traffic goes through the same-origin `/monitoring` tunnel, and fonts
 * are self-hosted by `next/font`.
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
 * Builds the CSP header value. Applied as a static header in `next.config.mjs`.
 *
 * Inline scripts are allowed via `'unsafe-inline'` instead of a per-request
 * nonce. A nonce can only be attached during server-side rendering, which pins
 * every route to dynamic rendering — and this site is fully prerendered. See
 * the CSP notes in README.md for what that gives up.
 *
 * `'unsafe-eval'` is only added outside production, where React tooling and
 * HMR still need it; the production header must not carry it.
 *
 * @returns {string}
 */
export function buildCsp() {
  const devEval = process.env.NODE_ENV !== 'production' ? ["'unsafe-eval'"] : [];
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
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
