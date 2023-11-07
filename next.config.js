/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */
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
  reactStrictMode: true,
  async redirects() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          destination: 'https://kevin-sauvage.com/:path*',
          has: [{ type: 'host', value: 'https://www.kevin-sauvage.com' }],
          permanent: true,
          source: '/:path*',
        },
      ];
    }
    return [];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './styles/')],
    prependData: `
    @import "@/styles/variables.scss"; 
    @import "@/styles/responsive.scss"; 
    @import "@/styles/mixins.scss"; `,
  },
};

module.exports = nextConfig;
