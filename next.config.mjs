/** @type {import('next').NextConfig} */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cspDirectives, cspToString } from './csp.config.mjs';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

// CSP directives and stringifier are extracted in ./csp.config.mjs

const nextConfig = {
  compress: true,
  experimental: {
    optimizeCss: true,
  },
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
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: cspToString(cspDirectives),
          },
        ],
        source: '/(.*)',
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 85, 100],
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        pathname: '/kevincloudname/image/upload/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: 'https://cloud.umami.is/script.js',
        source: '/growth/:match*',
      },
    ];
  },
  sassOptions: {
    // eslint-disable-next-line unicorn/prefer-module
    includePaths: [path.join(__dirname, './styles/')],
  },
};

export default nextConfig;
