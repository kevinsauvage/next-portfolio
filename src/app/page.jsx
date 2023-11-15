import About from '@/sections/About/About';
import Banner from '@/sections/Banner/Banner';
import Contact from '@/sections/Contact/Contact';
import Experiences from '@/sections/Experiences/Experiences';
import Projects from '@/sections/Projects/Projects';

import styles from './page.module.scss';

const Home = () => (
  <div className={styles.page} id="Home">
    <Banner />
    <About />
    <Experiences />
    <Projects />
    <Contact />
  </div>
);

export default Home;
