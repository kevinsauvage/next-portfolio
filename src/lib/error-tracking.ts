import { trackEvent } from './analytics';

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
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  console.error('Error logged:', { ...errorLog, context });
  trackEvent('error', { message: error.message, ...context });

  return errorLog;
}
