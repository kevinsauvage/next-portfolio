// Initializes Sentry for edge features (the proxy and edge routes). Unrelated to the
// Vercel Edge Runtime, and also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { parseSampleRate, sentryOptions } from '@/lib/sentry-options';

import * as Sentry from '@sentry/nextjs';

Sentry.init(sentryOptions(parseSampleRate(process.env['SENTRY_TRACES_SAMPLE_RATE'])));
