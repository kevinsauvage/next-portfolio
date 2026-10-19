import { afterEach, describe, expect, it, vi } from 'vitest';

const BASE_URL = 'https://example.com';

const load = async () => {
  vi.resetModules();
  return (await import('./metadata')).buildRootMetadata;
};

describe('buildRootMetadata', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('derives canonical, verification and Open Graph data from the base URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'site-key');
    vi.stubEnv('GOOGLE_SITE_VERIFICATION', 'verify-token');

    const buildRootMetadata = await load();
    const metadata = buildRootMetadata(BASE_URL);

    expect(metadata.metadataBase?.toString()).toBe(`${BASE_URL}/`);
    expect(metadata.alternates?.canonical).toBe(BASE_URL);
    expect(metadata.verification?.google).toBe('verify-token');
    expect(metadata.openGraph?.url).toBe(BASE_URL);
    expect(metadata.title).toMatchObject({ default: expect.any(String) });
  });
});
