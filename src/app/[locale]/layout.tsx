import { Metadata } from 'next';
import { Josefin_Sans, League_Spartan } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import Footer from '@/components/Footer';
import HeaderPresenter from '@/components/HeaderPresenter';
import MouseFollowGradientBackground from '@/components/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';
import { routing } from '@/i18n/routing';

import '@/styles/globals.scss';

import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  jobTitle: 'JavaScript Developer',
  mainEntityOfPage: { '@id': 'https://www.kevin-sauvage.com', '@type': 'WebPage' },
  name: 'Kévin Sauvage',
  sameAs: ['https://www.linkedin.com/in/kevin-sauvage', 'https://github.com/kevinsauvage'],
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
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
      <body className="w-full h-full text-zinc-50 antialiased font-base font-light">
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <NotificationProvider>
            <MouseFollowGradientBackground />
            <HeaderPresenter />
            <main className="min-h-dvh flex-1 h-full w-full flex flex-col">{children}</main>
            <Footer />
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home.metadata' });

  return {
    alternates: { canonical: './' },
    authors: [{ name: t('author') }],
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(`https://www.kevin-sauvage.com/`),
    openGraph: {
      description: t('description'),
      images: [{ url: '/images/og-image.png' }],
      siteName: t('title'),
      title: t('title'),
      type: 'website',
      url: t('canonical'),
    },
    title: t('title'),
    twitter: {
      card: 'summary_large_image',
      creator: t('author'),
      description: t('description'),
      images: '/images/og-image.png',
      title: t('title'),
    },
  };
}
