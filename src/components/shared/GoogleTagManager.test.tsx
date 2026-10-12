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

const { SCRIPT_TEST_ID, scriptSrcs } = vi.hoisted(() => ({
  SCRIPT_TEST_ID: 'analytics-script',
  scriptSrcs: [] as string[],
}));

vi.mock('next/script', () => ({
  default: ({ src }: { src: string }) => {
    scriptSrcs.push(src);
    return createElement('script', { 'data-testid': SCRIPT_TEST_ID, 'data-src': src });
  },
}));

const GRANTED: ConsentSettings = {
  ad_storage: false,
  analytics_storage: true,
  functionality_storage: true,
  personalization_storage: false,
};

const REFUSED: ConsentSettings = { ...GRANTED, analytics_storage: false };

const CONTAINER_ID = 'GTM-ABC1234';
const MEASUREMENT_ID = 'G-ABC1234';
const GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
const GTM_SRC = `https://www.googletagmanager.com/gtm.js?id=${CONTAINER_ID}`;

const clearConsentCookie = () => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
};

const chooseConsent = (settings: ConsentSettings) => {
  act(() => {
    writeStoredConsent(settings);
    dispatchConsentUpdated();
  });
};

const renderedSrcs = () =>
  screen.queryAllByTestId(SCRIPT_TEST_ID).map(node => node.getAttribute('data-src'));

beforeEach(() => {
  clearConsentCookie();
  scriptSrcs.length = 0;
  delete globalThis.window.gtag;
  delete globalThis.window.dataLayer;
});

afterEach(() => {
  clearConsentCookie();
});

describe('GoogleTagManager', () => {
  it('loads nothing before consent', () => {
    render(<GoogleTagManager ga4MeasurementId={MEASUREMENT_ID} gtmId={CONTAINER_ID} />);

    expect(renderedSrcs()).toEqual([]);
  });

  it('loads the Google tag and the container once tracking is allowed', () => {
    render(<GoogleTagManager ga4MeasurementId={MEASUREMENT_ID} gtmId={CONTAINER_ID} />);

    chooseConsent(GRANTED);

    expect(renderedSrcs()).toEqual([GTAG_SRC, GTM_SRC]);
  });

  it('queues the Google tag bootstrap before the script is fetched', () => {
    const gtag = vi.fn();
    globalThis.window.gtag = gtag;

    render(<GoogleTagManager ga4MeasurementId={MEASUREMENT_ID} gtmId={CONTAINER_ID} />);
    chooseConsent(GRANTED);

    expect(gtag).toHaveBeenCalledWith('config', MEASUREMENT_ID);
    expect(gtag).toHaveBeenCalledWith('js', expect.any(Date));
  });

  it('stays off when consent is refused', () => {
    render(<GoogleTagManager ga4MeasurementId={MEASUREMENT_ID} gtmId={CONTAINER_ID} />);

    chooseConsent(REFUSED);

    expect(renderedSrcs()).toEqual([]);
  });

  it('ignores malformed ids even with consent', () => {
    render(<GoogleTagManager ga4MeasurementId='not-a-tag' gtmId='not-a-container' />);

    chooseConsent(GRANTED);

    expect(renderedSrcs()).toEqual([]);
  });

  it('loads only what is configured', () => {
    render(<GoogleTagManager ga4MeasurementId={MEASUREMENT_ID} />);

    chooseConsent(GRANTED);

    expect(renderedSrcs()).toEqual([GTAG_SRC]);
  });

  it('re-asserts the stored consent on gtag when it mounts', () => {
    writeStoredConsent(GRANTED);
    const gtag = vi.fn();
    globalThis.window.gtag = gtag;

    render(<GoogleTagManager ga4MeasurementId={MEASUREMENT_ID} gtmId={CONTAINER_ID} />);

    expect(gtag).toHaveBeenCalledWith(
      'consent',
      'update',
      expect.objectContaining({ analytics_storage: 'granted' })
    );
  });
});
