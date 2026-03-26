import { trackEvent } from './analytics';
import { UMAMI_EVENTS } from './analytics-events';

interface ErrorLog {
  message: string;
  stack: string | undefined;
  timestamp: number;
  userAgent: string | undefined;
  url: string | undefined;
}

export function logError(error: Error, context?: Record<string, unknown>) {
  const errorLog: ErrorLog = {
    message: error.message,
    stack: error.stack ?? undefined,
    timestamp: Date.now(),
    userAgent: globalThis.window === undefined ? undefined : globalThis.window.navigator.userAgent,
    url: globalThis.window === undefined ? undefined : globalThis.window.location.href,
  };

  console.error('Error logged:', { ...errorLog, context });
  trackEvent(UMAMI_EVENTS.ERROR_CLIENT, {
    message: error.message,
    ...context,
  });

  return errorLog;
}
