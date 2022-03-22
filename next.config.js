/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "./styles/")],
    prependData: `
    @import "variables.scss"; 
    @import "responsive.scss"; 
    @import "colors.scss"; 
    @import "animation.scss";`,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.pdf$/i,
      type: "asset/source",
    });

    return config;
  },
};

module.exports = nextConfig;
