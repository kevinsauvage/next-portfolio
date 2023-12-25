import About from '@/components/_sections/About/About';
import Banner from '@/components/_sections/Banner/Banner';
import Contact from '@/components/_sections/Contact/Contact';
import Experiences from '@/components/_sections/Experiences/Experiences';
import Expertises from '@/components/_sections/Expertises/Expertises';
import Projects from '@/components/_sections/Projects/Projects';
import Skills from '@/components/_sections/Skills/Skills';

const Home = () => (
  <>
    <Banner />
    <Expertises />
    <About />
    <Experiences />
    <Skills />
    <Projects />
    <Contact />
  </>
);

export default Home;
