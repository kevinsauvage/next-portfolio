import React from "react";
import Footer from "../../component/Footer/Footer";
import Container from "../../component/Container/Container";
import styles from "./PageLayout.module.scss";
import Head from "next/head";
import Header from "../../component/Header/Header";

const PageLayout = ({ children, title }) => {
  const titleSeo = "Kévin Sauvage Portfolio | " + title;

  return (
    <div className={styles.PageLayout}>
      <Head>
        <title>{titleSeo}</title>
      </Head>
      <Header />
      <Container className={styles.container}>{children}</Container>
      <Footer />
      <svg style={{ width: "0", height: "0", position: "absolute" }} aria-hidden='true' focusable='false'>
        <linearGradient id='my-cool-gradient' x2='1' y2='1'>
          <stop offset='0%' stopColor='#f53844' />
          <stop offset='100%' stopColor='#42378f' />
        </linearGradient>
      </svg>
    </div>
  );
};

export default PageLayout;
