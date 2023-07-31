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
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './styles/')],
    prependData: `
    @import "@/styles/variables.scss"; 
    @import "@/styles/responsive.scss"; 
    @import "@/styles/mixins.scss"; 
    @import "@/styles/animation.scss";`,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/i,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;
