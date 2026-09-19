import { UMAMI_EVENTS } from './analytics-events';

export type { UmamiEventName } from './analytics-events';
export { UMAMI_EVENTS } from './analytics-events';

/**
 * Umami tracker API surface we rely on.
 *
 * @see https://docs.umami.is/docs/tracker-functions
 */
export interface UmamiTracker {
  track(): void;
  track(
    payload: Record<string, unknown> | ((props: Record<string, unknown>) => Record<string, unknown>)
  ): void;
  track(eventName: string, data?: Record<string, unknown>): void;
  identify(uniqueId: string, data?: Record<string, unknown>): void;
  identify(data: Record<string, unknown>): void;
}

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export type UmamiEventData = Record<string, unknown>;

/** Result of a `track*` / `identify` call. */
export type TrackStatus = 'sent' | 'queued' | 'dropped';

/** Mirrors Umami's documented event-data limits. */
const MAX_EVENT_DATA_PROPERTIES = 50;
const MAX_STRING_LENGTH = 500;
const MAX_QUEUE_SIZE = 50;

type QueuedEntry =
  | { kind: 'event'; eventName: string; data?: UmamiEventData | undefined }
  | { kind: 'pageview'; url?: string | undefined; title?: string | undefined }
  | { kind: 'identify'; uniqueId?: string | undefined; data?: UmamiEventData | undefined };

const eventQueue: QueuedEntry[] = [];

export function isBrowser(): boolean {
  return typeof globalThis.window !== 'undefined';
}

/**
 * `true` when the tracker script has loaded and exposed its API.
 * Note: the script uses `afterInteractive` loading, so events fired before
 * that are queued (see `flushUmamiQueue`) rather than dropped.
 */
export function isUmamiAvailable(): boolean {
  return isBrowser() && typeof globalThis.window.umami?.track === 'function';
}

export function isDoNotTrackEnabled(): boolean {
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
export function isUmamiEnabled(): boolean {
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

function enqueue(entry: QueuedEntry): TrackStatus {
  if (eventQueue.length >= MAX_QUEUE_SIZE) {
    eventQueue.shift();
  }
  eventQueue.push(entry);
  return 'queued';
}

/** Number of events waiting for the tracker script to load. */
export function getUmamiQueueSize(): number {
  return eventQueue.length;
}

/** Discards queued events (e.g. on consent withdrawal). */
export function clearUmamiQueue(): void {
  eventQueue.length = 0;
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
    const entry = eventQueue.shift() as QueuedEntry;
    try {
      sendEntry(entry);
      sent += 1;
    } catch {
      // Tracker failed mid-flush: requeue and retry on next flush.
      eventQueue.unshift(entry);
      break;
    }
  }
  return sent;
}

function sendEntry(entry: QueuedEntry): void {
  const tracker = globalThis.window.umami as UmamiTracker;
  if (entry.kind === 'event') {
    tracker.track(entry.eventName, sanitizeEventData(entry.data));
  } else if (entry.kind === 'pageview') {
    tracker.track(props => ({
      ...props,
      ...(entry.url === undefined ? {} : { url: entry.url }),
      ...(entry.title === undefined ? {} : { title: entry.title }),
    }));
  } else if (entry.uniqueId === undefined) {
    tracker.identify(sanitizeEventData(entry.data));
  } else {
    tracker.identify(entry.uniqueId, sanitizeEventData(entry.data));
  }
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
    return enqueue({ kind: 'event', eventName, data });
  }
  try {
    sendEntry({ kind: 'event', eventName, data });
    return 'sent';
  } catch {
    return enqueue({ kind: 'event', eventName, data });
  }
}

/**
 * Manually tracks a pageview, preserving the tracker's default properties.
 * Only needed when `data-auto-pageview="false"` is set — otherwise the
 * tracker already observes History API navigations automatically.
 */
export function trackPageview(url?: string, title?: string): TrackStatus {
  if (!isBrowser() || !isTrackingAllowed()) return 'dropped';
  if (!isUmamiAvailable()) {
    return enqueue({ kind: 'pageview', url, title });
  }
  try {
    sendEntry({ kind: 'pageview', url, title });
    return 'sent';
  } catch {
    return enqueue({ kind: 'pageview', url, title });
  }
}

/**
 * Assigns an ID and/or session data to the current visitor session.
 * Useful post-login or post-newsletter-signup (call with a stable,
 * non-PII ID — never raw emails).
 */
export function identifyUmamiSession(
  uniqueIdOrData: string | UmamiEventData,
  data?: UmamiEventData
): TrackStatus {
  if (!isBrowser() || !isTrackingAllowed()) return 'dropped';
  const entry: QueuedEntry =
    typeof uniqueIdOrData === 'string'
      ? { kind: 'identify', uniqueId: uniqueIdOrData, data }
      : { kind: 'identify', data: uniqueIdOrData };
  if (!isUmamiAvailable()) return enqueue(entry);
  try {
    sendEntry(entry);
    return 'sent';
  } catch {
    return enqueue(entry);
  }
}

/** Convenience wrapper for outbound clicks (defaults to OUTBOUND_LINK_CLICK). */
export function trackOutboundLink(
  url: string,
  data?: UmamiEventData,
  eventName: string = UMAMI_EVENTS.OUTBOUND_LINK_CLICK
): TrackStatus {
  return trackEvent(eventName, { url, ...data });
}

export interface UmamiScriptOptions {
  /** Restricts the tracker to these domains (comma-joined into data-domains). */
  domains?: string | string[] | undefined;
  /** Pass `false` to take over pageview tracking via `trackPageview()`. */
  autoTrack?: boolean | undefined;
}

export function getUmamiScriptProps(
  umamiId: string | undefined,
  options?: UmamiScriptOptions | undefined
): Record<string, string> | null {
  if (!umamiId) return null;
  const domains = options?.domains;
  const joinedDomains = domains === undefined ? '' : Array.isArray(domains) ? domains.join(',') : domains;
  return {
    'data-website-id': umamiId,
    'data-host-url': '/growth',
    'data-do-not-track': 'true',
    src: '/growth/script.js',
    ...(joinedDomains.length > 0 ? { 'data-domains': joinedDomains } : {}),
    ...(options?.autoTrack === false ? { 'data-auto-track': 'false' } : {}),
  };
}
