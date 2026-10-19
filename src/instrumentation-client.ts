// Initializes Sentry in the browser; runs whenever a visitor loads a page.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { parseSampleRate, sentryOptions } from '@/lib/observability/sentry-options';

import * as Sentry from '@sentry/nextjs';

Sentry.init(sentryOptions(parseSampleRate(process.env['NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE'])));

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
