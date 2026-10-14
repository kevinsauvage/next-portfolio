import { headers } from 'next/headers';

import 'server-only';

/** Per-request CSP nonce set by `src/proxy.ts`, or `undefined` outside a request. */
export async function getNonce(): Promise<string | undefined> {
  return (await headers()).get('x-nonce') ?? undefined;
}
