/** @type {import('next').NextConfig} */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const nextConfig = {
  compress: true,
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
        ],
        source: '/(.*)',
      },
    ];
  },
  images: {
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
