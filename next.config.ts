// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr', 'es', 'de', 'ar'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
};

module.exports = nextConfig;