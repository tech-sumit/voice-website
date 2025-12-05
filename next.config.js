/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  
  // Reverse proxy for PostHog to bypass ad blockers
  // Using /ph-data instead of /ingest to avoid ad blocker filters
  // Note: For Netlify, this is configured in netlify.toml instead
  // Using EU region endpoints
  async rewrites() {
    return [
      {
        source: '/ph-data/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ph-data/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },
  
  // This is required to make sure the rewrites work correctly
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig; 