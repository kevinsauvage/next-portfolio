import {
  applyConsentToGtag,
  normalizeGtmId,
  normalizeMeasurementId,
  pushGoogleTagBootstrap,
  sanitizeEventData,
  trackEvent,
} from './analytics';
import {
  CONSENT_COOKIE,
  type ConsentSettings,
  consentSignals,
  writeStoredConsent,
} from './consent';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const GRANTED: ConsentSettings = {
  ad_storage: false,
  analytics_storage: true,
  functionality_storage: true,
  personalization_storage: false,
};

const REFUSED: ConsentSettings = { ...GRANTED, analytics_storage: false };

const MEASUREMENT_ID = 'G-ABC1234';
const CONTAINER_ID = 'GTM-ABC1234';

const clearConsentCookie = () => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
};

const pushedEvents = () => globalThis.window.dataLayer ?? [];

function setDoNotTrack(value: string | undefined) {
  Object.defineProperty(globalThis.window.navigator, 'doNotTrack', {
    value,
    configurable: true,
  });
}

beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENABLE_IN_DEV', '');
  clearConsentCookie();
  delete globalThis.window.dataLayer;
  delete globalThis.window.gtag;
  setDoNotTrack(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('sanitizeEventData', () => {
  it('returns empty object for missing input', () => {
    expect(sanitizeEventData()).toEqual({});
  });

  it('truncates strings to GA4’s 100-char parameter limit', () => {
    const result = sanitizeEventData({ message: 'a'.repeat(150) });
    expect(result['message']).toHaveLength(100);
  });

  it('rounds numbers to 4 decimal places', () => {
    expect(sanitizeEventData({ price: 29.123_456_789 })['price']).toBe(29.1235);
  });

  it('drops null, undefined and non-finite numbers', () => {
    const result = sanitizeEventData({
      a: undefined,
      b: null,
      c: Number.NaN,
      d: Number.POSITIVE_INFINITY,
      e: 'kept',
    });
    expect(result).toEqual({ e: 'kept' });
  });

  it('stringifies arrays and objects within limits', () => {
    const result = sanitizeEventData({ tags: ['a', 'b'], meta: { plan: 'pro' } });
    expect(result['tags']).toBe('a,b');
    expect(result['meta']).toBe('{"plan":"pro"}');
  });

  it('caps parameters at 25', () => {
    const data: Record<string, number> = {};
    for (let index = 0; index < 40; index += 1) data[`k${index}`] = index;
    expect(Object.keys(sanitizeEventData(data))).toHaveLength(25);
  });
});

describe('trackEvent', () => {
  it('drops events until analytics consent is granted', () => {
    writeStoredConsent(REFUSED);
    expect(trackEvent('cta_click', { location: 'hero' })).toBe('dropped');
    expect(pushedEvents()).toHaveLength(0);
  });

  it('pushes a sanitized event to the dataLayer once consent is stored', () => {
    writeStoredConsent(GRANTED);
    const status = trackEvent('cta_click', { location: 'hero', count: 3.141_592_65 });

    expect(status).toBe('sent');
    expect(pushedEvents()).toEqual([{ event: 'cta_click', location: 'hero', count: 3.1416 }]);
  });

  it('drops events outside production without opt-in', () => {
    writeStoredConsent(GRANTED);
    vi.stubEnv('NODE_ENV', 'test');
    expect(trackEvent('dev_click')).toBe('dropped');
  });

  it('tracks in non-production with the opt-in flag', () => {
    writeStoredConsent(GRANTED);
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENABLE_IN_DEV', 'true');
    expect(trackEvent('dev_click')).toBe('sent');
  });

  it('drops events when Do Not Track is enabled', () => {
    writeStoredConsent(GRANTED);
    setDoNotTrack('1');
    expect(trackEvent('dnt_click')).toBe('dropped');
  });

  it('drops an empty event name', () => {
    writeStoredConsent(GRANTED);
    expect(trackEvent('')).toBe('dropped');
  });
});

describe('applyConsentToGtag', () => {
  it('does nothing before the gtag stub exists', () => {
    writeStoredConsent(GRANTED);
    expect(() => applyConsentToGtag()).not.toThrow();
    expect(pushedEvents()).toHaveLength(0);
  });

  it('re-asserts the stored choice as Consent Mode signals', () => {
    writeStoredConsent(GRANTED);
    const gtag = vi.fn();
    globalThis.window.gtag = gtag;

    applyConsentToGtag();

    expect(gtag).toHaveBeenCalledWith('consent', 'update', consentSignals(GRANTED));
  });

  it('does nothing without a stored choice', () => {
    const gtag = vi.fn();
    globalThis.window.gtag = gtag;

    applyConsentToGtag();

    expect(gtag).not.toHaveBeenCalled();
  });
});

describe('normalizeGtmId', () => {
  it('keeps a well-formed container id', () => {
    expect(normalizeGtmId(CONTAINER_ID)).toBe(CONTAINER_ID);
  });

  it('rejects a malformed or missing id', () => {
    expect(normalizeGtmId('GTM-')).toBeUndefined();
    expect(normalizeGtmId('gtm-abc1234')).toBeUndefined();
    expect(normalizeGtmId(MEASUREMENT_ID)).toBeUndefined();
    expect(normalizeGtmId(undefined)).toBeUndefined();
  });
});

describe('normalizeMeasurementId', () => {
  it('keeps a well-formed measurement id', () => {
    expect(normalizeMeasurementId(MEASUREMENT_ID)).toBe(MEASUREMENT_ID);
  });

  it('rejects a malformed or missing id', () => {
    expect(normalizeMeasurementId('G-')).toBeUndefined();
    expect(normalizeMeasurementId('g-abc1234')).toBeUndefined();
    expect(normalizeMeasurementId(CONTAINER_ID)).toBeUndefined();
    expect(normalizeMeasurementId(undefined)).toBeUndefined();
  });
});

describe('pushGoogleTagBootstrap', () => {
  it('does nothing before the gtag stub exists', () => {
    expect(() => pushGoogleTagBootstrap(MEASUREMENT_ID)).not.toThrow();
  });

  it('queues js and config for the measurement id', () => {
    const gtag = vi.fn();
    globalThis.window.gtag = gtag;

    pushGoogleTagBootstrap(MEASUREMENT_ID);

    expect(gtag).toHaveBeenNthCalledWith(1, 'js', expect.any(Date));
    expect(gtag).toHaveBeenNthCalledWith(2, 'config', MEASUREMENT_ID);
  });
});
