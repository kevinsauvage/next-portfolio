import React from 'react';
import { ToastContainer } from 'react-toastify';
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
