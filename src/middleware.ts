import { NextRequest, NextResponse } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';
const cookieName = 'i18nlang';

function getLocale(request: NextRequest) {
  if (request.cookies.has(cookieName)) {
    return request.cookies.get(cookieName)!.value;
  }

  const acceptLang = request.headers.get('Accept-Language');
  if (!acceptLang) return defaultLocale;
  const headers = { 'accept-language': acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
