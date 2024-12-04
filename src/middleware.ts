import { NextRequest, NextResponse } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';
export const cookieName = 'i18nlang';

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

const pathnameHasLocale = (pathname: string) => {
  return locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathnameHasLocale(pathname)) return;

  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl, {
    headers: {
      'Set-Cookie': `${cookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Strict; HttpOnly; Secure`,
    },
    status: 301,
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)'],
};
