// Initializes Sentry on the server. Options are shared with the client/edge runtimes.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { parseSampleRate, sentryOptions } from '@/lib/observability/sentry-options';

import * as Sentry from '@sentry/nextjs';

Sentry.init(sentryOptions(parseSampleRate(process.env['SENTRY_TRACES_SAMPLE_RATE'])));
