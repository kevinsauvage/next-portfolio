import Head from "next/head";
import PageLayout from "../layout/PageLayout/PageLayout";
import Banner from "../layout/Banner/Banner";
import About from "../layout/About/About";
import What from "../layout/What/What";
import Projects from "../layout/Projects/Projects";
import Contact from "../layout/Contact/Contact";
import ReactGA from "react-ga4";

export default function Home() {
  ReactGA.initialize("G-5JKFZLHFH1");

  return (
    <div id='app'>
      <Head>
        <title>Kévin Sauvage Portfolio</title>
      </Head>
      <PageLayout>
        <Banner />
        <About />
        <What />
        <Projects />
        <Contact />
      </PageLayout>
    </div>
  );
}
