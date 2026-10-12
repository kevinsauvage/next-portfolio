import {
  CONSENT_COOKIE,
  CONSENT_UPDATED_EVENT,
  consentFromFormData,
  type ConsentSettings,
  consentSignals,
  dispatchConsentUpdated,
  hasAnalyticsConsent,
  hasTagManagerConsent,
  readStoredConsent,
  writeStoredConsent,
} from './consent';

import { afterEach, describe, expect, it, vi } from 'vitest';

const GRANTED: ConsentSettings = {
  ad_storage: true,
  analytics_storage: true,
  functionality_storage: true,
  personalization_storage: true,
};

const REFUSED: ConsentSettings = {
  ad_storage: false,
  analytics_storage: false,
  functionality_storage: true,
  personalization_storage: false,
};

const clearConsentCookie = () => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
};

afterEach(() => {
  clearConsentCookie();
});

describe('consentSignals', () => {
  it('grants every category the visitor allowed', () => {
    expect(consentSignals(GRANTED)).toEqual({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
    });
  });

  it('derives the EEA advertising signals from the single advertising toggle', () => {
    const signals = consentSignals(REFUSED);

    expect(signals.ad_storage).toBe('denied');
    expect(signals.ad_user_data).toBe('denied');
    expect(signals.ad_personalization).toBe('denied');
    expect(signals.functionality_storage).toBe('granted');
  });
});

describe('readStoredConsent', () => {
  it('returns null without a cookie', () => {
    clearConsentCookie();
    expect(readStoredConsent()).toBeNull();
  });

  it('round-trips a written choice', () => {
    writeStoredConsent(REFUSED);
    expect(readStoredConsent()).toEqual(REFUSED);
  });

  it('treats a missing category as refused', () => {
    const value = encodeURIComponent(JSON.stringify({ version: 1, analytics_storage: true }));
    document.cookie = `${CONSENT_COOKIE}=${value}; Path=/`;

    expect(readStoredConsent()).toEqual({
      ad_storage: false,
      analytics_storage: true,
      functionality_storage: false,
      personalization_storage: false,
    });
  });

  it('discards a choice stored under an older policy version', () => {
    const value = encodeURIComponent(JSON.stringify({ version: 0, analytics_storage: true }));
    document.cookie = `${CONSENT_COOKIE}=${value}; Path=/`;

    expect(readStoredConsent()).toBeNull();
  });

  it('survives a corrupt cookie', () => {
    document.cookie = `${CONSENT_COOKIE}=not-json; Path=/`;
    expect(readStoredConsent()).toBeNull();
  });
});

describe('consent gates', () => {
  it('gates analytics and GTM on the stored categories', () => {
    writeStoredConsent(REFUSED);
    expect(hasAnalyticsConsent()).toBe(false);
    expect(hasTagManagerConsent()).toBe(false);

    writeStoredConsent({ ...REFUSED, analytics_storage: true });
    expect(hasAnalyticsConsent()).toBe(true);
    expect(hasTagManagerConsent()).toBe(true);
  });

  it('lets advertising consent alone load GTM but not analytics events', () => {
    writeStoredConsent({ ...REFUSED, ad_storage: true });
    expect(hasAnalyticsConsent()).toBe(false);
    expect(hasTagManagerConsent()).toBe(true);
  });
});

describe('consentFromFormData', () => {
  it('reads the checked categories and always grants necessary storage', () => {
    const formData = new FormData();
    formData.set('analytics_storage', 'on');

    expect(consentFromFormData(formData)).toEqual({
      ad_storage: false,
      analytics_storage: true,
      functionality_storage: true,
      personalization_storage: false,
    });
  });
});

describe('dispatchConsentUpdated', () => {
  it('notifies listeners', () => {
    const listener = vi.fn();
    window.addEventListener(CONSENT_UPDATED_EVENT, listener);

    dispatchConsentUpdated();

    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(CONSENT_UPDATED_EVENT, listener);
  });
});
