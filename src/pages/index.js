import styles from "../pages/Index.module.scss";
import Head from "next/head";
import PageLayout from "../layout/PageLayout/PageLayout";
import Banner from "../component/Banner/Banner";
import About from "../component/About/About";
import What from "../component/What/What";
import Projects from "../component/Projects/Projects";
import Contact from "../component/Contact/Contact";
import ReactGA from "react-ga4";

export default function Home() {
  ReactGA.initialize("G-5JKFZLHFH1");

  return (
    <div id="app" className={styles["App"]}>
      <Head>
        <title>Kévin Sauvage Portfolio</title>
      </Head>
      <PageLayout>
        <div className={styles["App__container"]}>
          <Banner />
          <About />
          <What />
          <Projects />
          <Contact />
        </div>
      </PageLayout>
    </div>
  );
}
