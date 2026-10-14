import { withSentryConfig } from '@sentry/nextjs/config';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Turbopack scoped to this repo. Without this, a lockfile elsewhere
  // (e.g. ~/pnpm-lock.yaml) makes Next infer the wrong workspace root.
  turbopack: {
    root: __dirname,
  },
  // Avoid duplicate, separately-bundled copies of the OpenTelemetry API under
  // Turbopack (the cause of Sentry's recursive-.with() crash). Recommended by
  // Sentry: https://github.com/getsentry/sentry-javascript/issues/19367
  serverExternalPackages: ['@opentelemetry/api'],
  async headers() {
    return [
      {
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
        source: '/(.*)',
      },
    ];
  },
  images: {
    // Vercel's image optimizer is over quota (402 on /_next/image); the
    // screenshots are already small JPEGs, so serve them from /public as-is.
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'kevin-6c',

  project: 'portfolio',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  webpack: {
    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
