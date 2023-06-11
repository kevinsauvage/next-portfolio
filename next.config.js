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
        ],
        source: '/',
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
    @import "variables.scss"; 
    @import "responsive.scss"; 
    @import "mixins.scss"; 
    @import "animation.scss";`,
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
