import React from 'react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

import Container from '../Container/Container';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import styles from './PageLayout.module.scss';

const PageLayout = ({ children, title }) => {
  // eslint-disable-next-line sonarjs/no-nested-template-literals
  const titleSeo = `Kévin Sauvage ${title ? `|  ${title}` : ''}`;

  return (
    <div className={styles.PageLayout}>
      <Head>
        <title>{titleSeo}</title>
      </Head>
      <Header />
      <Container>{children}</Container>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default PageLayout;
