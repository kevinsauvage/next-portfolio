import type { Metadata } from 'next';
import { Josefin_Sans, League_Spartan } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MouseFollowGradientBackground from '@/components/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';
import { routing } from '@/i18n/routing';

import '@/styles/globals.scss';

import clsx from 'clsx';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  about:
    'I specialize in building high-performance web applications with a focus on accessibility and inclusivity. Passionate about delivering seamless experiences to users of all abilities.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ES',
    addressLocality: 'Spain',
  },
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  email: 'contact@kevin-sauvage.com',
  hasOccupation: {
    '@type': 'Occupation',
    description: 'Frontend Developer specializing in React, Next.js, and web accessibility',
    name: 'Frontend Developer',
    occupationLocation: {
      '@type': 'Place',
      name: 'Decathlon International',
    },
  },
  jobTitle: 'Frontend Developer',
  knowsAbout: [
    'JavaScript',
    'Web Accessibility',
    'React',
    'Next.js',
    'Frontend Development',
    'Performance Optimization',
    'TypeScript',
    'HTML',
    'CSS',
    'Sass',
    'Tailwind CSS',
    'Responsive Design',
    'Progressive Web Apps',
    'Web Performance',
    'Web Development',
    'Internationalization',
    'SEO',
    'User Experience',
  ],
  mainEntityOfPage: {
    '@id': 'https://www.kevin-sauvage.com',
    '@type': 'WebPage',
    description: 'Portfolio website of Kévin Sauvage, Frontend Developer',
    name: 'Kévin Sauvage - Portfolio',
  },
  name: 'Kévin Sauvage',
  sameAs: [
    'https://www.linkedin.com/in/kevin-sauvage',
    'https://github.com/kevinsauvage',
    'https://www.kevin-sauvage.com',
  ],
  url: 'https://www.kevin-sauvage.com',
};

const LeagueSpartan = League_Spartan({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
});

const JosefinSans = Josefin_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-base',
  weight: ['100', '200', '300', '400', '500'],
});

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const parameters = await params;

  const { locale } = parameters;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={clsx(
        'bg-zinc-950 h-auto w-auto leading-tight scroll-smooth',
        JosefinSans.variable,
        LeagueSpartan.variable,
      )}
    >
      <body className='w-full h-full text-zinc-50 antialiased font-base font-light'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          strategy='lazyOnload'
          data-website-id={process.env.UMAMI_ID}
          src={'/growth/rewrites'}
        />
        <NextIntlClientProvider messages={messages}>
          <NotificationProvider>
            <MouseFollowGradientBackground />
            <a
              href='#main-content'
              className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:shadow-lg'
            >
              Skip to main content
            </a>
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
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;

export async function generateMetadata(properties: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const parameters = await properties.params;

  const { locale } = parameters;

  const t = await getTranslations({ locale, namespace: 'home.metadata' });

  const baseUrl = 'https://www.kevin-sauvage.com';
  const currentUrl = `${baseUrl}/${locale}`;

  return {
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        fr: `${baseUrl}/fr`,
      },
    },
    authors: [{ name: t('author') }],
    category: 'Technology',
    creator: t('author'),
    description: t('description'),
    generator: 'Next.js',
    keywords: t('keywords'),
    metadataBase: new URL(baseUrl),
    openGraph: {
      description: t('description'),
      images: [
        {
          alt: `${t('author')} - ${t('title')}`,
          height: 630,
          url: '/images/og-image.png',
          width: 1200,
        },
      ],
      locale: locale,
      siteName: t('title'),
      title: t('title'),
      type: 'website',
      url: currentUrl,
    },
    publisher: t('author'),
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
      index: true,
    },
    title: {
      default: t('title'),
      template: `%s | ${t('author')}`,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@kevinsauvage',
      description: t('description'),
      images: ['/images/og-image.png'],
      site: '@kevinsauvage',
      title: t('title'),
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}
