/** Options shared by the client, server and edge Sentry runtimes. */

const DSN =
  'https://e85e1a8bad8347f9b79451dca6ff441e@o4505076388724736.ingest.us.sentry.io/4505076396064768';

/** Low-traffic portfolio: full-rate tracing only burns quota. */
const DEFAULT_TRACES_SAMPLE_RATE = 0.1;

/** Parses a 0–1 sample rate from an env string, falling back to the default. */
export const parseSampleRate = (value: string | undefined): number => {
  const rate = Number(value);
  return value !== undefined && value !== '' && rate >= 0 && rate <= 1
    ? rate
    : DEFAULT_TRACES_SAMPLE_RATE;
};

export const sentryOptions = (tracesSampleRate: number) => ({
  dsn: DSN,
  tracesSampleRate,
  // Keep PII out of Sentry: no user identifiers and no request bodies.
  dataCollection: {
    userInfo: false,
    httpBodies: [],
  },
});
