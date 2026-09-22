import { NextRequest } from 'next/server';

import { proxy } from './proxy';

import { afterEach, describe, expect, it, vi } from 'vitest';

const buildRequest = () => new NextRequest('https://www.kevin-sauvage.com/');

const cspOf = (request: NextRequest) => proxy(request).headers.get('content-security-policy') ?? '';

const scriptSrcOf = (csp: string) =>
  csp.split('; ').find(part => part.startsWith('script-src ')) ?? '';

describe('proxy CSP', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("quotes object-src as 'none' and emits a per-request nonce", () => {
    const csp = cspOf(buildRequest());

    expect(csp).toMatch(/script-src 'self' 'nonce-[^']+'/);
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain('object-src none');
  });

  it('does not fall back to unsafe-inline in script-src when a nonce is present', () => {
    expect(scriptSrcOf(cspOf(buildRequest()))).not.toContain("'unsafe-inline'");
  });

  it('omits unsafe-eval in production and includes it in development', () => {
    vi.stubEnv('NODE_ENV', 'production');
    expect(cspOf(buildRequest())).not.toContain("'unsafe-eval'");

    vi.stubEnv('NODE_ENV', 'development');
    expect(cspOf(buildRequest())).toContain("'unsafe-eval'");
  });

  it('uses a fresh nonce per request', () => {
    const first = cspOf(buildRequest());
    const second = cspOf(buildRequest());

    expect(first).not.toBe(second);
  });
});
