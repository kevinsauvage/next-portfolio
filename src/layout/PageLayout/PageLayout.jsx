import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import styles from "./PageLayout.module.scss";

const PageLayout = ({ children }) => {
  return (
    <div className={styles.PageLayout}>
      <Header />
      <Container classname={styles.container}>{children}</Container>
      <Footer />
      <svg
        style={{ width: "0", height: "0", position: "absolute" }}
        aria-hidden="true"
        focusable="false">
        <linearGradient id="my-cool-gradient" x2="1" y2="1">
          <stop offset="0%" stopColor="#f53844" />
          <stop offset="100%" stopColor="#42378f" />
        </linearGradient>
      </svg>
    </div>
  );
};

export default PageLayout;
