export type { UmamiEventName } from './analytics-events';
export { UMAMI_EVENTS } from './analytics-events';

/**
 * Umami tracker API surface we rely on.
 *
 * @see https://docs.umami.is/docs/tracker-functions
 */
export interface UmamiTracker {
  track(eventName: string, data?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export type UmamiEventData = Record<string, unknown>;

/** Result of a `track*` call. */
export type TrackStatus = 'sent' | 'queued' | 'dropped';

/** Mirrors Umami's documented event-data limits. */
const MAX_EVENT_DATA_PROPERTIES = 50;
const MAX_STRING_LENGTH = 500;
const MAX_QUEUE_SIZE = 50;

type QueuedEvent = {
  eventName: string;
  data?: UmamiEventData | undefined;
};

const eventQueue: QueuedEvent[] = [];

function isBrowser(): boolean {
  return typeof globalThis.window !== 'undefined';
}

/**
 * `true` when the tracker script has loaded and exposed its API.
 * Note: the script uses `afterInteractive` loading, so events fired before
 * that are queued (see `flushUmamiQueue`) rather than dropped.
 */
function isUmamiAvailable(): boolean {
  return isBrowser() && typeof globalThis.window.umami?.track === 'function';
}

function isDoNotTrackEnabled(): boolean {
  if (!isBrowser()) return false;
  const nav = globalThis.window.navigator as Navigator & { doNotTrack?: unknown };
  const dnt =
    nav.doNotTrack ?? (globalThis.window as unknown as Record<string, unknown>)['doNotTrack'];
  return dnt === '1' || dnt === 'yes';
}

/**
 * Guards against polluting production analytics from dev/test.
 * Set `NEXT_PUBLIC_UMAMI_ENABLE_IN_DEV=true` to opt in locally.
 */
function isUmamiEnabled(): boolean {
  if (process.env.NODE_ENV === 'production') return true;
  return process.env['NEXT_PUBLIC_UMAMI_ENABLE_IN_DEV'] === 'true';
}

function isTrackingAllowed(): boolean {
  return isUmamiEnabled() && !isDoNotTrackEnabled();
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
  return String(value).slice(0, MAX_STRING_LENGTH);
}

/**
 * Coerce arbitrary event data to Umami's documented limits:
 * strings ≤ 500 chars, numbers ≤ 4 decimal places, arrays stringified
 * (≤ 500 chars), objects ≤ 50 properties. Drops unserializable values.
 *
 * @see https://docs.umami.is/docs/tracker-functions#event-data-limits
 */
export function sanitizeEventData(
  data?: UmamiEventData
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

function sendEvent(eventName: string, data?: UmamiEventData): void {
  const tracker = globalThis.window.umami as UmamiTracker;
  tracker.track(eventName, sanitizeEventData(data));
}

/**
 * Sends queued events once the tracker is ready. Called automatically on
 * script `onLoad`; safe to call manually. Returns the number of events sent.
 */
export function flushUmamiQueue(): number {
  if (!isTrackingAllowed()) {
    // Never send queued events after opt-out / in disabled envs.
    eventQueue.length = 0;
    return 0;
  }
  if (!isUmamiAvailable()) return 0;
  let sent = 0;
  while (eventQueue.length > 0) {
    const entry = eventQueue.shift() as QueuedEvent;
    try {
      sendEvent(entry.eventName, entry.data);
      sent += 1;
    } catch {
      // Tracker failed mid-flush: requeue and retry on next flush.
      eventQueue.unshift(entry);
      break;
    }
  }
  return sent;
}

function enqueue(entry: QueuedEvent): TrackStatus {
  if (eventQueue.length >= MAX_QUEUE_SIZE) {
    eventQueue.shift();
  }
  eventQueue.push(entry);
  return 'queued';
}

/**
 * Tracks a custom event. Never throws and never blocks the caller:
 * returns `'sent'` when delivered, `'queued'` when the tracker hasn't
 * loaded yet (flushed automatically on script load), or `'dropped'`
 * when tracking is disabled (dev without opt-in, DNT, or SSR).
 */
export function trackEvent(eventName: string, data?: UmamiEventData): TrackStatus {
  if (!isBrowser() || !isTrackingAllowed()) return 'dropped';
  if (!eventName) return 'dropped';
  if (!isUmamiAvailable()) {
    return enqueue({ eventName, data });
  }
  try {
    sendEvent(eventName, data);
    return 'sent';
  } catch {
    return enqueue({ eventName, data });
  }
}

export interface UmamiScriptOptions {
  /** Restricts the tracker to these domains (comma-joined into data-domains). */
  domains?: string | string[] | undefined;
}

export function getUmamiScriptProps(
  umamiId: string | undefined,
  options?: UmamiScriptOptions | undefined
): Record<string, string> | null {
  if (!umamiId) return null;
  const domains = options?.domains;
  const joinedDomains =
    domains === undefined ? '' : Array.isArray(domains) ? domains.join(',') : domains;
  return {
    'data-website-id': umamiId,
    'data-host-url': '/growth',
    'data-do-not-track': 'true',
    src: '/growth/script.js',
    ...(joinedDomains.length > 0 ? { 'data-domains': joinedDomains } : {}),
  };
}
