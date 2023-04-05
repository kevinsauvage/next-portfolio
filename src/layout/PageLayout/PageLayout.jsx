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
        <linearGradient id="my-cool-gradient" x2="1" y2="1">
          <stop offset="0%" stopColor="#f53844" />
          <stop offset="100%" stopColor="#42378f" />
        </linearGradient>
      </svg>
    </div>
  );
};

export default PageLayout;
