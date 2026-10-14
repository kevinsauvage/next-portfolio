import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import AnalyticsTracker from '@/components/shared/AnalyticsTracker';
import ClientOnlyWidgets from '@/components/shared/ClientOnlyWidgets';
import ConsentModeDefaults from '@/components/shared/ConsentModeDefaults';
import CookieBannerLoader from '@/components/shared/CookieBannerLoader';
import GoogleTagManager from '@/components/shared/GoogleTagManager';
import HeadLinks from '@/components/shared/HeadLinks';
import ScrollDetector from '@/components/shared/ScrollDetector';
import SonnerToaster from '@/components/shared/SonnerToaster';
import StructuredData from '@/components/shared/StructuredData';
import { SITE_URL } from '@/config/site';
import { getNonce } from '@/lib/csp-nonce';
import { getPublicEnv } from '@/lib/env';
import { buildRootMetadata } from '@/lib/seo-metadata';

import '@/styles/globals.scss';

import clsx from 'clsx';

const plusJakartaSans = Plus_Jakarta_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
  preload: true,
});

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-base',
  weight: ['300', '400', '500'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
  preload: true,
});

const jetBrainsMono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-code',
  weight: ['400', '500', '600'],
  fallback: ['ui-monospace', 'monospace'],
  preload: false,
});

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const publicEnv = getPublicEnv();
  // Same per-request nonce as StructuredData: GTM propagates it to the scripts
  // it injects, which is what keeps the container working under the strict CSP.
  const nonce = await getNonce();

  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      className={clsx(
        'bg-black h-auto w-auto leading-tight',
        inter.variable,
        plusJakartaSans.variable,
        jetBrainsMono.variable
      )}
    >
      <head>
        <HeadLinks />
        <ConsentModeDefaults />
      </head>
      <body className='w-full h-full antialiased font-base font-normal text-zinc-50'>
        <StructuredData />
        <GoogleTagManager
          ga4MeasurementId={publicEnv.GA4_MEASUREMENT_ID}
          gtmId={publicEnv.GTM_ID}
          nonce={nonce}
        />
        <AnalyticsTracker />
        <ScrollDetector />
        <SonnerToaster />
        <nav aria-label='Skip navigation'>
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:rounded-md focus:shadow-lg text-zinc-50'
          >
            Skip to main content
          </a>
        </nav>
        <Header />
        <main
          id='main-content'
          className='min-h-dvh flex-1 h-full w-full flex flex-col'
          aria-label='Main content'
        >
          {children}
        </main>
        <Footer />
        <ClientOnlyWidgets />
        <CookieBannerLoader />
      </body>
    </html>
  );
};

export default Layout;

export const generateMetadata = (): Metadata => buildRootMetadata(SITE_URL);
