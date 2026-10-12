export type { AnalyticsEventName } from './analytics-events';
export { ANALYTICS_EVENTS } from './analytics-events';

import {
  type ConsentSettings,
  consentSignals,
  hasAnalyticsConsent,
  readStoredConsent,
} from './consent';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: 'config' | 'event' | 'consent' | 'set' | 'js',
      // `js` carries a Date, the others a target id or event name.
      target: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

export type AnalyticsEventData = Record<string, unknown>;

/** Result of a `track*` call. */
export type TrackStatus = 'sent' | 'dropped';

/**
 * Mirrors GA4's documented parameter limits, so a payload never reaches the
 * dataLayer with values the tag would silently truncate or reject.
 *
 * @see https://support.google.com/analytics/answer/9267744
 */
const MAX_EVENT_DATA_PROPERTIES = 25;
const MAX_STRING_LENGTH = 100;

function isBrowser(): boolean {
  return globalThis.window !== undefined;
}

function isDoNotTrackEnabled(): boolean {
  if (!isBrowser()) return false;
  const navigator_ = globalThis.window.navigator as Navigator & { doNotTrack?: unknown };
  const doNotTrack =
    navigator_.doNotTrack ??
    (globalThis.window as unknown as Record<string, unknown>)['doNotTrack'];
  return doNotTrack === '1' || doNotTrack === 'yes';
}

/**
 * Guards against polluting production analytics from dev/test.
 * Set `NEXT_PUBLIC_ANALYTICS_ENABLE_IN_DEV=true` to opt in locally.
 */
function isAnalyticsEnabled(): boolean {
  if (process.env.NODE_ENV === 'production') return true;
  return process.env['NEXT_PUBLIC_ANALYTICS_ENABLE_IN_DEV'] === 'true';
}

/**
 * Every signal that gates a send: the browser has to exist, tracking has to be
 * enabled for this environment, the visitor must not have opted out via DNT,
 * and the banner must have granted analytics storage.
 */
function canTrack(): boolean {
  return isBrowser() && isAnalyticsEnabled() && !isDoNotTrackEnabled() && hasAnalyticsConsent();
}

function sanitizeValue(value: unknown): string | number | boolean | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string') return value.slice(0, MAX_STRING_LENGTH);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return undefined;
    return Math.round(value * 10_000) / 10_000;
  }
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.join(',').slice(0, MAX_STRING_LENGTH);
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value).slice(0, MAX_STRING_LENGTH);
    } catch {
      return undefined;
    }
  }
  if (typeof value === 'bigint') {
    return value.toString().slice(0, MAX_STRING_LENGTH);
  }
  if (typeof value === 'symbol') {
    return value.description?.slice(0, MAX_STRING_LENGTH);
  }
  return undefined;
}

/**
 * Coerces arbitrary event data to GA4's documented limits: strings ≤ 100 chars,
 * numbers ≤ 4 decimal places, arrays stringified (≤ 100 chars), objects
 * stringified (≤ 100 chars), at most 25 properties. Drops unserializable values.
 */
export function sanitizeEventData(
  data?: AnalyticsEventData
): Record<string, string | number | boolean> {
  if (!data || typeof data !== 'object') return {};
  const entries: Array<[string, string | number | boolean]> = [];
  for (const [key, value] of Object.entries(data)) {
    if (entries.length >= MAX_EVENT_DATA_PROPERTIES) break;
    const sanitized = sanitizeValue(value);
    if (sanitized !== undefined) entries.push([key, sanitized]);
  }
  return Object.fromEntries(entries);
}

function pushToDataLayer(payload: Record<string, unknown>): void {
  if (!isBrowser()) return;

  // The assignment gets its own statement: folding it into the `push` call
  // hides a side effect inside a sub-expression.
  globalThis.window.dataLayer ??= [];
  globalThis.window.dataLayer.push(payload);
}

/**
 * Tracks a custom event through the GTM dataLayer. Never throws and never
 * blocks the caller: returns `'sent'` when pushed, or `'dropped'` when tracking
 * is disabled (SSR, dev without opt-in, DNT) or analytics consent is missing.
 *
 * There is no queue: the dataLayer *is* the queue, so events pushed before
 * `gtm.js` loads are replayed by GTM. Events before consent are dropped on
 * purpose — holding them would mean tracking a visitor who refused.
 */
export function trackEvent(eventName: string, data?: AnalyticsEventData): TrackStatus {
  if (!eventName || !canTrack()) return 'dropped';

  pushToDataLayer({ event: eventName, ...sanitizeEventData(data) });
  return 'sent';
}

/**
 * Re-asserts the stored choice on `gtag` before GTM loads. The inline default
 * script starts every category at `denied`, so this is what actually grants them.
 */
export function applyConsentToGtag(settings?: ConsentSettings | null): void {
  if (!isBrowser() || typeof globalThis.window.gtag !== 'function') return;

  const consent = settings ?? readStoredConsent();
  if (!consent) return;

  globalThis.window.gtag('consent', 'update', consentSignals(consent));
}

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

/**
 * A validated container id, or `undefined`. Keeps a malformed value out of the
 * `gtm.js` URL even when env validation was skipped (e.g. a plain unit test).
 */
export function normalizeGtmId(id: string | undefined): string | undefined {
  return id && GTM_ID_PATTERN.test(id) ? id : undefined;
}

/**
 * A validated GA4 measurement id, or `undefined`. Same guard as
 * {@link normalizeGtmId}: nothing interpolates into the `gtag/js` URL unchecked.
 */
export function normalizeMeasurementId(id: string | undefined): string | undefined {
  return id && MEASUREMENT_ID_PATTERN.test(id) ? id : undefined;
}

/**
 * Queues the Google tag bootstrap (`gtag('js')` + `gtag('config')`). The pushes
 * land in the dataLayer and gtag.js replays them when it loads, so this runs
 * before the script tag is fetched.
 */
export function pushGoogleTagBootstrap(measurementId: string): void {
  if (!isBrowser() || typeof globalThis.window.gtag !== 'function') return;

  globalThis.window.gtag('js', new Date());
  globalThis.window.gtag('config', measurementId);
}
