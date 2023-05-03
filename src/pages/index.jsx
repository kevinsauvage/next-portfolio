import About from '../component/About/About';
import Banner from '../component/Banner/Banner';
import Contact from '../component/Contact/Contact';
import Experiences from '../component/Experiences/Experiences';
import PageLayout from '../component/PageLayout/PageLayout';
import Projects from '../component/Projects/Projects';
import What from '../component/What/What';

const Home = () => (
  <PageLayout>
    <Banner />
    <About />
    <Experiences />
    <Projects />
    <What />
    <Contact />
  </PageLayout>
);

export default Home;
