import { buildCsp, cspToString } from '../csp.config.mjs';

import { afterEach, describe, expect, it, vi } from 'vitest';

const scriptSrcOf = (csp: string) =>
  csp.split('; ').find(part => part.startsWith('script-src ')) ?? '';

describe('buildCsp', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows inline scripts and quotes object-src as 'none'", () => {
    vi.stubEnv('NODE_ENV', 'production');
    const csp = buildCsp();

    expect(scriptSrcOf(csp)).toContain("'unsafe-inline'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain('object-src none');
  });

  it('never emits a nonce, which would force dynamic rendering', () => {
    vi.stubEnv('NODE_ENV', 'production');

    expect(buildCsp()).not.toMatch(/'nonce-/);
  });

  it('omits unsafe-eval in production and includes it in development', () => {
    vi.stubEnv('NODE_ENV', 'production');
    expect(buildCsp()).not.toContain("'unsafe-eval'");

    vi.stubEnv('NODE_ENV', 'development');
    expect(buildCsp()).toContain("'unsafe-eval'");
  });

  it('forbids framing by other origins and drops unused third-party hosts', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const csp = buildCsp();

    expect(csp).toContain("frame-ancestors 'self'");
    expect(scriptSrcOf(csp)).toContain('https://www.googletagmanager.com');
    expect(scriptSrcOf(csp)).toContain('https://www.google.com');
    expect(csp).not.toContain('vercel-scripts.com');
    expect(csp).not.toContain('vitals.vercel-insights.com');
    expect(csp).not.toContain('fonts.gstatic.com');
    expect(csp).not.toContain('sentry.io');
  });

  it('allows the Vercel preview toolbar only on preview deployments', () => {
    vi.stubEnv('NODE_ENV', 'production');
    expect(buildCsp()).not.toContain('vercel.live');

    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(scriptSrcOf(buildCsp())).toContain('https://vercel.live');
  });
});

describe('cspToString', () => {
  it('renders directives followed by the free-form tail', () => {
    expect(cspToString({ 'default-src': ["'self'"], other: ['upgrade-insecure-requests'] })).toBe(
      "default-src 'self'; upgrade-insecure-requests"
    );
  });
});
