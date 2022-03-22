import styles from "../pages/Index.module.scss";
import Head from "next/head";
import PageLayout from "../layout/PageLayout/PageLayout";
import Banner from "../component/Banner/Banner";
import About from "../component/About/About";
import What from "../component/What/What";
import Projects from "../component/Projects/Projects";
import Contact from "../component/Contact/Contact";

export default function Home() {
  return (
    <div id="app" className={styles["App"]}>
      <PageLayout>
        <div className={styles["App__container"]}>
          <Banner />
          <div className={styles["App__wrapper"]}>
            <About />
            <What />
          </div>
          <Projects />
          <Contact />
        </div>
      </PageLayout>
    </div>
  );
}
