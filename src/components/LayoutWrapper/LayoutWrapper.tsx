import GlobalProvider from '@/contexts/GlobalContext';

import { AlegreyaFont, jsonLd } from './LayoutWrapper.config';

import styles from './LayoutWrapper.module.scss';

import { Analytics } from '@vercel/analytics/react';

type Properties = { children: React.ReactNode };

const LayoutWrapper = ({ children }: Properties) => (
  <html lang="en" className={styles.html}>
    <body className={`${AlegreyaFont.variable} ${styles.body}`}>
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlobalProvider>{children}</GlobalProvider>
    </body>
  </html>
);

export default LayoutWrapper;
