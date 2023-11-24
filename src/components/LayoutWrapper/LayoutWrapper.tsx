import { Roboto_Condensed, Roboto_Mono } from 'next/font/google';

import styles from './LayoutWrapper.module.scss';

import { Analytics } from '@vercel/analytics/react';

type Properties = {
  children: React.ReactNode;
};

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

const LayoutWrapper = ({ children }: Properties) => (
  <html lang="en" className={styles.html}>
    <body className={`${robotoCondensed.variable} ${robotoMono.variable} ${styles.body}`}>
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </body>
  </html>
);

export default LayoutWrapper;
