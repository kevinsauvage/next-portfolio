// @ts-check
/** @typedef {import('./csp.config').CSPDirectives} CSPDirectives */

/** Hosts allowed to run scripts (in addition to nonce'd inline scripts). */
const SCRIPT_SRC_HOSTS = [
  'https://cloud.umami.is',
  'https://gateway.umami.is',
  'https://www.google.com',
  'https://www.gstatic.com',
  'https://va.vercel-scripts.com',
  'https://vercel.live',
];

/** @type {CSPDirectives} */
export const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", ...SCRIPT_SRC_HOSTS],
  // Allow Web Workers created from same-origin and blob: URLs
  'worker-src': ["'self'", 'blob:'],
  // Legacy fallback for some browsers
  'child-src': ["'self'", 'blob:'],
  'connect-src': [
    "'self'",
    'https://cloud.umami.is',
    'https://gateway.umami.is',
    'https://api-gateway.umami.dev',
    'https://www.google.com',
    'https://www.gstatic.com',
    'https://vitals.vercel-insights.com',
    'https://o4505076388724736.ingest.us.sentry.io',
    'https://*.ingest.us.sentry.io',
  ],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'style-src': ["'self'", "'unsafe-inline'"],
  'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
  'frame-src': ['https://www.google.com', 'https://vercel.live'],
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
  ];
  return cspToString({ ...cspDirectives, 'script-src': scriptSrc });
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
