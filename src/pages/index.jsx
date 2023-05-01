import About from '../component/About/About';
import Banner from '../component/Banner/Banner';
import Contact from '../component/Contact/Contact';
import Projects from '../component/Projects/Projects';
import What from '../component/What/What';
import PageLayout from '../layout/PageLayout/PageLayout';

const Home = () => (
  <div id="app">
    <PageLayout title="Home">
      <Banner />
      <About />
      <Projects />
      <What />
      <Contact />
    </PageLayout>
  </div>
);

export default Home;
