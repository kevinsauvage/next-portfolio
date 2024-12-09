import { NextRequest, NextResponse } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const locales = ['en', 'fr', 'es'];
export const defaultLocale = 'en';
export const cookieName = 'i18nlang';

const getLocale = (request: NextRequest) => {
  if (request.cookies.has(cookieName)) {
    return request.cookies.get(cookieName)!.value;
  }

  const acceptLang = request.headers.get('Accept-Language');
  if (!acceptLang) return defaultLocale;
  const headers = { 'accept-language': acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
};

const pathnameHasLocale = (pathname: string) => {
  return locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
};

export function middleware(request: NextRequest) {
  const { origin, basePath, pathname } = request.nextUrl;

  if (pathnameHasLocale(pathname)) return;

  const locale = getLocale(request);

  const localePath = `/${locale}`;

  if (pathname !== localePath) {
    const redirectUrl = `${origin}${basePath}${localePath}${pathname}`;

    return NextResponse.redirect(new URL(redirectUrl), {
      headers: {
        'Set-Cookie': `${cookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Strict; HttpOnly; Secure`,
      },
    });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)'],
};
