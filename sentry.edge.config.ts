// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://e85e1a8bad8347f9b79451dca6ff441e@o4505076388724736.ingest.us.sentry.io/4505076396064768',

  // Sample a fraction of transactions — low-traffic site, full-rate tracing wastes quota.
  tracesSampleRate: Number(process.env['SENTRY_TRACES_SAMPLE_RATE'] ?? 0.1),

  // Keep PII out of Sentry: no user identifiers and no request bodies.
  dataCollection: {
    userInfo: false,
    httpBodies: [],
  },
});
