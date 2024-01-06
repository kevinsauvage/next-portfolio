import NavigationPresenter from '../Navigation/NavigationPresenter';

import { AlegreyaFont, jsonLd } from './LayoutWrapper.config';

import styles from './LayoutWrapper.module.scss';

import { Analytics } from '@vercel/analytics/react';

type Properties = { children: React.ReactNode };

const LayoutWrapper = ({ children }: Properties) => (
  <html lang="en" className={styles.html}>
    <body className={`${AlegreyaFont.variable} ${styles.body}`}>
      <div className="blur-effect blur0" />
      <div className="blur-effect blur1" />
      <div className="blur-effect blur2" />
      <div className="blur-effect blur3" />
      <div className="blur-effect blur4" />
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
      <div className={styles.navigation}>
        <NavigationPresenter />
      </div>
    </body>
  </html>
);

export default LayoutWrapper;
