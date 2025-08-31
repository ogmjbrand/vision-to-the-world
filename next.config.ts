// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Ignore ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ['en', 'fr', 'es', 'de', 'ar'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
};

export default nextConfig;