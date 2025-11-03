import type { Metadata } from 'next';
import { Josefin_Sans, League_Spartan } from 'next/font/google';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BackToTopButton from '@/components/shared/BackToTopButton';
import HeadLinks from '@/components/shared/HeadLinks';
import StructuredData from '@/components/shared/StructuredData';
import UmamiScript from '@/components/shared/UmamiScript';
import { WebVitals } from '@/components/shared/WebVitals';
import NotificationProvider from '@/contexts/NotificationContext';
import { colors } from '@/design-system/tokens';
import { getPublicEnv } from '@/lib/env';

import '@/styles/globals.scss';

import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

const LeagueSpartan = League_Spartan({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
  preload: false,
});

const JosefinSans = Josefin_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-base',
  weight: ['300', '400', '500'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
  preload: true,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const publicEnv = getPublicEnv();
  return (
    <html
      lang='en'
      className={clsx(
        'bg-zinc-950 h-auto w-auto leading-tight',
        JosefinSans.variable,
        LeagueSpartan.variable
      )}
    >
      <head>
        <HeadLinks />
      </head>
      <body className={clsx('w-full h-full antialiased font-base font-light', colors.text.primary)}>
        <StructuredData />
        <UmamiScript umamiId={publicEnv.UMAMI_ID} />
        <NotificationProvider>
          <nav aria-label='Skip navigation'>
            <a
              href='#main-content'
              className={clsx(
                'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:rounded-md focus:shadow-lg',
                colors.text.primary
              )}
            >
              Skip to main content
            </a>
          </nav>
          <Header />
          <main
            id='main-content'
            className='min-h-dvh flex-1 h-full w-full flex flex-col'
            role='main'
            aria-label='Main content'
          >
            {children}
          </main>
          <Footer />
          <BackToTopButton />
        </NotificationProvider>
        <WebVitals />
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = 'https://www.kevin-sauvage.com';
  const { buildRootMetadata } = await import('@/lib/seo-metadata');
  return buildRootMetadata(baseUrl);
}
