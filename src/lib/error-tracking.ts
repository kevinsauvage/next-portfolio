import { trackEvent } from './analytics';
import { UMAMI_EVENTS } from './analytics-events';

import * as Sentry from '@sentry/nextjs';

/**
 * Non-PII context allowed to travel with an error. Keep this to coarse
 * identifiers (codes, statuses, counts) — never form contents, emails,
 * names, message bodies, tokens, or raw provider payloads.
 */
export type ErrorContext = Record<string, string | number | boolean | undefined>;

interface ErrorLog {
  message: string;
  stack: string | undefined;
  timestamp: number;
  userAgent: string | undefined;
  url: string | undefined;
}

/**
 * Reports an error to Sentry plus a coarse analytics event.
 *
 * The caller-supplied `code` is the only free-form string forwarded; the raw
 * error message is deliberately not sent to analytics, and `context` is
 * expected to be non-PII (it is attached to Sentry only).
 */
export function logError(error: Error, code: string, context?: ErrorContext) {
  const errorLog: ErrorLog = {
    message: error.message,
    stack: error.stack ?? undefined,
    timestamp: Date.now(),
    userAgent: globalThis.window === undefined ? undefined : globalThis.window.navigator.userAgent,
    url: globalThis.window === undefined ? undefined : globalThis.window.location.href,
  };

  console.error('Error logged:', { code, ...errorLog });

  Sentry.captureException(error, {
    tags: { code },
    extra: context ? { code, ...context } : { code },
  });

  trackEvent(UMAMI_EVENTS.ERROR_CLIENT, { code });

  return errorLog;
}
