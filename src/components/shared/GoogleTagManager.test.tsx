import { createElement } from 'react';

import {
  CONSENT_COOKIE,
  type ConsentSettings,
  dispatchConsentUpdated,
  writeStoredConsent,
} from '@/lib/consent';

import GoogleTagManager from './GoogleTagManager';

import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { SCRIPT_TEST_ID } = vi.hoisted(() => ({ SCRIPT_TEST_ID: 'gtm-script' }));

vi.mock('next/script', () => ({
  default: ({ src }: { src: string }) =>
    createElement('script', { 'data-testid': SCRIPT_TEST_ID, 'data-src': src }),
}));

const GRANTED: ConsentSettings = {
  ad_storage: false,
  analytics_storage: true,
  functionality_storage: true,
  personalization_storage: false,
};

const REFUSED: ConsentSettings = { ...GRANTED, analytics_storage: false };

const CONTAINER_ID = 'GTM-ABC1234';

const clearConsentCookie = () => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
};

const chooseConsent = (settings: ConsentSettings) => {
  act(() => {
    writeStoredConsent(settings);
    dispatchConsentUpdated();
  });
};

beforeEach(() => {
  clearConsentCookie();
  delete globalThis.window.gtag;
});

afterEach(() => {
  clearConsentCookie();
});

describe('GoogleTagManager', () => {
  it('loads nothing before consent', () => {
    render(<GoogleTagManager gtmId={CONTAINER_ID} />);

    expect(screen.queryByTestId(SCRIPT_TEST_ID)).not.toBeInTheDocument();
  });

  it('loads the container once tracking is allowed', () => {
    render(<GoogleTagManager gtmId={CONTAINER_ID} />);

    chooseConsent(GRANTED);

    expect(screen.getByTestId(SCRIPT_TEST_ID)).toHaveAttribute(
      'data-src',
      `https://www.googletagmanager.com/gtm.js?id=${CONTAINER_ID}`
    );
  });

  it('stays off when consent is refused', () => {
    render(<GoogleTagManager gtmId={CONTAINER_ID} />);

    chooseConsent(REFUSED);

    expect(screen.queryByTestId(SCRIPT_TEST_ID)).not.toBeInTheDocument();
  });

  it('ignores a malformed container id even with consent', () => {
    render(<GoogleTagManager gtmId='not-a-container' />);

    chooseConsent(GRANTED);

    expect(screen.queryByTestId(SCRIPT_TEST_ID)).not.toBeInTheDocument();
  });

  it('re-asserts the stored consent on gtag when it mounts', () => {
    writeStoredConsent(GRANTED);
    const gtag = vi.fn();
    globalThis.window.gtag = gtag;

    render(<GoogleTagManager gtmId={CONTAINER_ID} />);

    expect(gtag).toHaveBeenCalledWith(
      'consent',
      'update',
      expect.objectContaining({ analytics_storage: 'granted' })
    );
  });
});
