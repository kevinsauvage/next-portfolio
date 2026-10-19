import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const loadEnv = async () => {
  vi.resetModules();
  return import('./index');
};

describe('getPublicEnv', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'site-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('parses the public variables, leaving analytics ids optional', async () => {
    const { getPublicEnv } = await loadEnv();

    expect(getPublicEnv().NEXT_PUBLIC_RECAPTCHA_SITE_KEY).toBe('site-key');
    expect(getPublicEnv().GTM_ID).toBeUndefined();
  });

  it('rejects a malformed GTM id and names the variable', async () => {
    vi.stubEnv('GTM_ID', 'not-an-id');
    const { getPublicEnv } = await loadEnv();

    expect(() => getPublicEnv()).toThrow(/GTM_ID/);
  });

  it('exposes the optional Google site verification token', async () => {
    vi.stubEnv('GOOGLE_SITE_VERIFICATION', 'token');
    const { getPublicEnv } = await loadEnv();

    expect(getPublicEnv().GOOGLE_SITE_VERIFICATION).toBe('token');
  });
});

describe('getServerEnv', () => {
  beforeEach(() => {
    // The helper refuses to run where a `window` exists, as in the browser.
    vi.stubGlobal('window', undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('throws listing the missing server secrets', async () => {
    vi.stubEnv('RECAPTCHA_SECRET_KEY', '');
    const { getServerEnv } = await loadEnv();

    expect(() => getServerEnv()).toThrow(
      /Invalid server environment variables.*RECAPTCHA_SECRET_KEY/s
    );
  });

  it('returns the validated secrets when all are set', async () => {
    for (const key of [
      'email_js_service_id',
      'email_js_public_key',
      'email_js_private_key',
      'email_js_template_id',
      'RECAPTCHA_SECRET_KEY',
    ]) {
      vi.stubEnv(key, `${key}-value`);
    }
    const { getServerEnv } = await loadEnv();

    expect(getServerEnv().RECAPTCHA_SECRET_KEY).toBe('RECAPTCHA_SECRET_KEY-value');
  });
});
