/**
 * Cookie consent state: the four Google Consent Mode v2 categories the banner
 * writes, plus the tiny event bus that lets the banner, the GTM loader and
 * `trackEvent` agree on the current choice.
 *
 * Deliberately hand-written (no CMP dependency): the categories, the cookie
 * shape and the signals mirror the sibling ecommerce repo so both sites behave
 * identically. Consent is opt-in — nothing is granted until the visitor says so.
 */

/** The four banner categories, as stored in the consent cookie. */
export type ConsentSettings = {
  ad_storage: boolean;
  analytics_storage: boolean;
  functionality_storage: boolean;
  personalization_storage: boolean;
};

export type ConsentStatus = 'granted' | 'denied';

/** The Consent Mode payload `gtag('consent', ...)` expects. */
export type ConsentSignals = Record<keyof ConsentSettings, ConsentStatus> & {
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
};

/** Cookie holding the visitor's choice (JSON of {@link ConsentSettings}). */
export const CONSENT_COOKIE = 'localConsent';

/**
 * Bump when the categories change: a choice stored under an older policy is
 * discarded so the banner asks again, instead of silently honouring a stale grant.
 */
export const CONSENT_VERSION = 1;

/** 6 months — the CNIL's recommended maximum lifetime for a consent choice. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182;

/** Fired after the visitor updates their cookie consent. */
export const CONSENT_UPDATED_EVENT = 'consentUpdated';

/** Fired to reopen the consent settings (the footer's "Cookie settings" button). */
export const OPEN_CONSENT_SETTINGS_EVENT = 'openConsentSettings';

/** Strictly necessary storage stays allowed; every optional category is refused. */
export const DENIED_CONSENT: ConsentSettings = {
  ad_storage: false,
  analytics_storage: false,
  functionality_storage: true,
  personalization_storage: false,
};

/** Every optional category accepted; necessary storage is always granted. */
export const GRANTED_CONSENT: ConsentSettings = {
  ad_storage: true,
  analytics_storage: true,
  functionality_storage: true,
  personalization_storage: true,
};

const toStatus = (value: boolean): ConsentStatus => (value ? 'granted' : 'denied');

/** The Consent Mode v2 signals for a choice; advertising drives the EEA pair. */
export const consentSignals = (settings: ConsentSettings): ConsentSignals => ({
  ad_storage: toStatus(settings.ad_storage),
  ad_user_data: toStatus(settings.ad_storage),
  ad_personalization: toStatus(settings.ad_storage),
  analytics_storage: toStatus(settings.analytics_storage),
  functionality_storage: toStatus(settings.functionality_storage),
  personalization_storage: toStatus(settings.personalization_storage),
});

type StoredConsent = ConsentSettings & { version: number };

/**
 * The stored choice, or `null` when absent, unreadable, or written under an
 * older {@link CONSENT_VERSION}. A missing category counts as refused.
 */
export const readStoredConsent = (): ConsentSettings | null => {
  if (typeof document === 'undefined') return null;

  let parsed: unknown;
  try {
    const raw = readCookie(CONSENT_COOKIE);
    parsed = JSON.parse(raw ? decodeURIComponent(raw) : 'null');
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== 'object') return null;

  const stored = parsed as Partial<StoredConsent>;
  if (stored.version !== CONSENT_VERSION) return null;

  return {
    ad_storage: stored.ad_storage === true,
    analytics_storage: stored.analytics_storage === true,
    functionality_storage: stored.functionality_storage === true,
    personalization_storage: stored.personalization_storage === true,
  };
};

/** Persists a choice. A blocked cookie jar must not break the click handler. */
export const writeStoredConsent = (settings: ConsentSettings): void => {
  if (typeof document === 'undefined') return;

  const value = encodeURIComponent(JSON.stringify({ ...settings, version: CONSENT_VERSION }));
  const secure = globalThis.location?.protocol === 'https:' ? '; Secure' : '';

  try {
    document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  } catch {
    // Storage disabled: the visitor is asked again next visit, which is safe.
  }
};

/** True when analytics storage was granted (custom events and GA4 tags). */
export const hasAnalyticsConsent = (): boolean => readStoredConsent()?.analytics_storage === true;

/** True when any tag may load at all; Consent Mode limits each tag to its signal. */
export const hasTagManagerConsent = (): boolean => {
  const consent = readStoredConsent();

  return Boolean(consent?.analytics_storage || consent?.ad_storage);
};

/** Reads the choice from the checked boxes; necessary storage is always granted. */
export const consentFromFormData = (formData: FormData): ConsentSettings => ({
  ad_storage: formData.has('ad_storage'),
  analytics_storage: formData.has('analytics_storage'),
  functionality_storage: true,
  personalization_storage: formData.has('personalization_storage'),
});

const dispatch = (name: string): void => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(name));
};

export const dispatchConsentUpdated = (): void => dispatch(CONSENT_UPDATED_EVENT);

/** Reopens the consent settings (the footer button listens for this). */
export const openConsentSettings = (): void => dispatch(OPEN_CONSENT_SETTINGS_EVENT);

/** Reads one cookie's raw value; `''` when absent. */
function readCookie(name: string): string {
  if (typeof document === 'undefined') return '';

  for (const entry of document.cookie.split(';')) {
    const cookie = entry.trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.slice(name.length + 1);
    }
  }

  return '';
}
