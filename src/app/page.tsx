import About from '@/components/_sections/About/About';
import Contact from '@/components/_sections/Contact/Contact';
import Experiences from '@/components/_sections/Experiences/Experiences';
import Hero from '@/components/_sections/Hero/Hero';
import Projects from '@/components/_sections/Projects/Projects';
import Skills from '@/components/_sections/Skills/Skills';
import Container from '@/components/Container/Container';

const Home = () => (
  <>
    <Hero />
    <Container>
      <About />
      <Experiences />
      <Skills />
      <Projects />
      <Contact />
    </Container>
  </>
);

export default Home;
