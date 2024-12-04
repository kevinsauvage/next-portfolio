/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const path = require('node:path');

const nextConfig = {
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
  sassOptions: {
    includePaths: [path.join(__dirname, './styles/')],
  },
};

module.exports = nextConfig;
