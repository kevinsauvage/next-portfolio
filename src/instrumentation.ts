import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    // Next 16.3 registers enough per-request `close` listeners on ServerResponse
    // (its internals + rewrite proxy) that Sentry's APM instrumentation pushes it
    // past Node's default limit of 10. This is a known upstream regression and the
    // listeners are per-request, not a leak: https://github.com/vercel/next.js/discussions/96973
    const { setMaxListeners } = await import('node:events');
    setMaxListeners(20);

    await import('../sentry.server.config');
  }

  if (process.env['NEXT_RUNTIME'] === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
