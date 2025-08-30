// middleware.ts
import { NextRequest } from 'next/server';

const geoToLocale: Record<string, string> = {
  US: 'en', FR: 'fr', DE: 'de', ES: 'es', EG: 'ar', SA: 'ar', CA: 'en', GB: 'en'
};

export function middleware(req: NextRequest) {
  const country = req.geo?.country || 'US';
  const locale = geoToLocale[country] || 'en';
  const path = req.nextUrl.pathname;

  if (!path.startsWith(`/${locale}`)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${path}`;
    return Response.redirect(url);
  }
}