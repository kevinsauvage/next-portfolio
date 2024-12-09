import { Metadata } from 'next';
import { Josefin_Sans, League_Spartan } from 'next/font/google';

import Footer from '@/components/Footer';
import HeaderPresenter from '@/components/HeaderPresenter';
import MouseFollowGradientBackground from '@/components/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';
import { getDictionary } from '@/dictionaries/dictionaries';

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

const Layout = ({ children, params }: { children: React.ReactNode; params: { lang: string } }) => {
  return (
    <html
      lang={params.lang}
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
        <NotificationProvider>
          <MouseFollowGradientBackground />
          <HeaderPresenter />
          <main className="min-h-dvh flex-1 h-full w-full flex flex-col">{children}</main>
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  );
};

export default Layout;

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    alternates: { canonical: './' },
    authors: [{ name: t.home.metadata.author }],
    description: t.home.metadata.description,
    keywords: t.home.metadata.keywords,
    metadataBase: new URL(`https://www.kevin-sauvage.com/`),
    openGraph: {
      description: t.home.metadata.description,
      images: [{ url: '/images/og-image.png' }],
      siteName: t.home.metadata.title,
      title: t.home.metadata.title,
      type: 'website',
      url: t.home.metadata.canonical,
    },
    title: t.home.metadata.title,
    twitter: {
      card: 'summary_large_image',
      creator: t.home.metadata.author,
      description: t.home.metadata.description,
      images: '/images/og-image.png',
      title: t.home.metadata.title,
    },
  };
}
