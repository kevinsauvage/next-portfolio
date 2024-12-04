import { Josefin_Sans, League_Spartan } from 'next/font/google';

import Footer from '@/components/Footer';
import HeaderPresenter from '@/components/HeaderPresenter';
import MouseFollowGradientBackground from '@/components/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';

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

type Properties = { children: React.ReactNode };

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'fr' }];
}

const PageLayout = ({ children }: Properties) => {
  return (
    <html
      lang="en"
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

export default PageLayout;
