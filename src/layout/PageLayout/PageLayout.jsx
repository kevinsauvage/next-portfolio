import React from 'react';
import Head from 'next/head';

import Container from '../../component/Container/Container';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';

import styles from './PageLayout.module.scss';

const PageLayout = ({ children, title }) => {
  const titleSeo = `Kévin Sauvage Portfolio | ${title}`;

  return (
    <div className={styles.PageLayout}>
      <Head>
        <title>{titleSeo}</title>
      </Head>
      <Header />
      <Container>{children}</Container>
      <Footer />
      <svg viewBox="0 0 1 1">
        <defs>
          <linearGradient
            id="my-cool-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientTransform="rotate(60)"
          >
            <stop offset="0%" stop-color="var(--primary)" />
            <stop offset="100%" stop-color="var(--secondary)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1" height="1" fill="url(#my-cool-gradient)" />
      </svg>
    </div>
  );
};

export default PageLayout;
