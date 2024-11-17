import { Josefin_Sans, Yeseva_One } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
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

const YesevaOne = Yeseva_One({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400'],
});

const JosefinSans = Josefin_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-base',
  weight: ['100', '200', '300', '400', '500'],
});

type Properties = { children: React.ReactNode };

const PageLayout = ({ children }: Properties) => {
  return (
    <html
      lang="en"
      className={clsx(
        'bg-zinc-950 h-auto w-auto leading-tight scroll-smooth',
        JosefinSans.variable,
        YesevaOne.variable,
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
          <Header />
          <main className="min-h-dvh flex-1 h-full w-full flex flex-col">{children}</main>
          <Footer />
          <div id="myPortal" />
        </NotificationProvider>
      </body>
    </html>
  );
};

export default PageLayout;

export const metadata = {
  alternates: { canonical: 'https://www.kevin-sauvage.com/' },
  description:
    'Crafting high-performance, inclusive web solutions that prioritize accessibility. Proficient in JavaScript, React.js, Next.js.',
  title: 'Kévin Sauvage developer portfolio website',
};
