import { withSentryConfig } from '@sentry/nextjs/config';
/** @type {import('next').NextConfig} */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  compress: true,
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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31_536_000, // 1 year for static portfolio images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 85, 100],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: 'https://cloud.umami.is/script.js',
        source: '/growth/script.js',
      },
      {
        // Legacy path, kept so cached HTML still loads the tracker.
        destination: 'https://cloud.umami.is/script.js',
        source: '/growth/rewrites',
      },
      {
        // Umami Cloud collect endpoint (moved to gateway.umami.is on 2026-06-06).
        // Proxied same-origin via data-host-url so tracker POSTs to /growth/api/send.
        destination: 'https://gateway.umami.is/api/send',
        source: '/growth/api/send',
      },
    ];
  },
  sassOptions: {
    // eslint-disable-next-line unicorn/prefer-module
    includePaths: [path.join(__dirname, './styles/')],
  },
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
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
