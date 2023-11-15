/* eslint-disable camelcase */
import { Analytics } from '@vercel/analytics/react';
import { Roboto_Condensed, Roboto_Mono } from 'next/font/google';

import Container from '@/components/Container/Container';
import HeaderPresenter from '@/components/Header/HeaderPresenter';
import MouseFollowGradientBackground from '@/components/MouseFollowBackground/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';
import styles from './layout.module.scss';

const robotoCondensed = Roboto_Condensed({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '700',
});

const robotoMono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-body',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  jobTitle: 'JavaScript Developer',
  mainEntityOfPage: {
    '@id': 'https://www.kevin-sauvage.com',
    '@type': 'WebPage',
  },
  name: 'Kévin Sauvage',
  sameAs: ['https://www.linkedin.com/in/kevin-sauvage', 'https://github.com/kevinsauvage'],
  url: 'https://www.kevin-sauvage.com',
};

const PageLayout = ({ children }) => (
  <html lang="en" className={styles.html}>
    <body className={`${robotoCondensed.variable} ${robotoMono.variable} ${styles.body}`}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NotificationProvider>
        <HeaderPresenter />
        <Container>{children}</Container>
        <MouseFollowGradientBackground />
        <div className={styles.backgroundImage} />
      </NotificationProvider>
      <Analytics />
    </body>
  </html>
);

export default PageLayout;

export const metadata = {
  alternates: {
    canonical: 'https://www.kevin-sauvage.com/',
  },
  description:
    'Crafting high-performance, inclusive web solutions that prioritize accessibility. Proficient in JavaScript, React.js, Next.js.',
  title: 'Kévin Sauvage developer portfolio website',
};
