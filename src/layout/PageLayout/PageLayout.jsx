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
      <svg
        style={{ height: '0', position: 'absolute', width: '0' }}
        aria-hidden="true"
        focusable="false"
      >
        <linearGradient
          id="my-cool-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientTransform="rotate(60)"
        >
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </linearGradient>
      </svg>
    </div>
  );
};

export default PageLayout;
