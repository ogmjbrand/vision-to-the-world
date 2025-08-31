// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ i18n config (optional, can be removed if not using)
  i18n: {
    locales: ['en', 'fr', 'es', 'de', 'ar'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
};

export default nextConfig;