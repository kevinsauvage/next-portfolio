// @ts-check
/** @typedef {import('./csp.config').CSPDirectives} CSPDirectives */

/** @type {CSPDirectives} */
export const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://cloud.umami.is',
    'https://www.google.com',
    'https://www.gstatic.com',
    'https://va.vercel-scripts.com',
    'https://vercel.live',
  ],
  // Allow Web Workers created from same-origin and blob: URLs
  'worker-src': ["'self'", 'blob:'],
  // Legacy fallback for some browsers
  'child-src': ["'self'", 'blob:'],
  'connect-src': [
    "'self'",
    'https://cloud.umami.is',
    'https://api-gateway.umami.dev',
    'https://www.google.com',
    'https://www.gstatic.com',
    'https://vitals.vercel-insights.com',
  ],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
  'frame-src': ['https://www.google.com'],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'object-src': ['none'],
  other: ['upgrade-insecure-requests'],
};

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
