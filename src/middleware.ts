import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
