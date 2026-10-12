import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/dynamic', () => ({
  default: () => () => null,
}));

const load = async () => (await import('./CookieBannerLoader')).default;

describe('CookieBannerLoader SSR', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  // Reading the cookie during render would cause a hydration mismatch.
  it('renders identically with and without the consent cookie', async () => {
    const Loader = await load();
    const withoutCookie = renderToString(createElement(Loader));

    vi.stubGlobal('document', { cookie: 'localConsent={"version":1,"analytics_storage":true}' });
    const withCookie = renderToString(createElement(Loader));

    expect(withCookie).toBe(withoutCookie);
    expect(withoutCookie).not.toContain('cookie');
  });
});
