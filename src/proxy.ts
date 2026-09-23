import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { buildCsp } from '../csp.config.mjs';

/**
 * Generates a per-request nonce and sets a nonce-based CSP for both the
 * request (so Next can attach the nonce to its own scripts) and the response.
 *
 * Trade-off (intentional): consuming the nonce in `StructuredData` /
 * `layout` via `headers()` opts every route into dynamic rendering — `/` and
 * `/projects/[slug]` are server-rendered rather than static HTML. A nonce is
 * the only mechanism that keeps Next's generated inline bootstrap scripts
 * strict without hashing every emitted script, so SSR is accepted here. See
 * the CSP notes in README.md before changing this.
 */
export function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('content-security-policy', csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Skip prefetches and static assets/documents that don't need a nonce.
      missing: [
        { key: 'next-router-prefetch', type: 'header' },
        { key: 'purpose', type: 'header', value: 'prefetch' },
      ],
      source:
        '/((?!monitoring|_next/static|_next/image|favicon.ico|.*[.](?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|pdf|xml|txt)$).*)',
    },
  ],
};
