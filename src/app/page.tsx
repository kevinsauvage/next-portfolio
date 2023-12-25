import About from '@/sections/About/About';
import Banner from '@/sections/Banner/Banner';
import Contact from '@/sections/Contact/Contact';
import Experiences from '@/sections/Experiences/Experiences';
import Expertises from '@/sections/Expertises/Expertises';
import Projects from '@/sections/Projects/Projects';
import Skills from '@/sections/Skills/Skills';

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
