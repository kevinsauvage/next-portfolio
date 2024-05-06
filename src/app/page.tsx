import About from '@/components/_sections/About';
import Contact from '@/components/_sections/Contact';
import Experiences from '@/components/_sections/Experiences';
import Hero from '@/components/_sections/Hero';
import Projects from '@/components/_sections/Projects';
import Skills from '@/components/_sections/Skills';

const Home = () => (
  <>
    <Hero />
    <div className="container px-3 m-auto md:max-w-3xl">
      <About />
      <Experiences />
      <Skills />
      <Projects />
      <Contact />
    </div>
  </>
);

export default Home;
