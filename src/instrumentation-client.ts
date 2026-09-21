// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://e85e1a8bad8347f9b79451dca6ff441e@o4505076388724736.ingest.us.sentry.io/4505076396064768',

  // Sample a fraction of transactions — this is a low-traffic portfolio, so
  // full-rate tracing only burns quota. Override via NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE.
  tracesSampleRate: Number(process.env['NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE'] ?? 0.1),

  // Keep PII out of Sentry: no user identifiers and no request bodies.
  dataCollection: {
    userInfo: false,
    httpBodies: [],
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
