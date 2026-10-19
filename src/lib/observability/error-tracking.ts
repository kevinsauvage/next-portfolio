import { trackEvent } from '../analytics';
import { ANALYTICS_EVENTS } from '../analytics/events';

import * as Sentry from '@sentry/nextjs';

/**
 * Non-PII context allowed to travel with an error. Keep this to coarse
 * identifiers (codes, statuses, counts) — never form contents, emails,
 * names, message bodies, tokens, or raw provider payloads.
 */
export type ErrorContext = Record<string, string | number | boolean | undefined>;

/**
 * Reports an error to Sentry plus a coarse analytics event.
 *
 * The caller-supplied `code` is the only free-form string forwarded; the raw
 * error message is deliberately not sent to analytics, and `context` is
 * expected to be non-PII (it is attached to Sentry only).
 */
export function logError(error: Error, code: string, context?: ErrorContext): void {
  console.error('Error logged:', { code, message: error.message, stack: error.stack });

  Sentry.captureException(error, {
    tags: { code },
    extra: context ? { code, ...context } : { code },
  });

  trackEvent(ANALYTICS_EVENTS.ERROR_CLIENT, { code });
}
