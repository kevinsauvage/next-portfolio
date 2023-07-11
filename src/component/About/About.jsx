import about from '../../data/about';
import { aboutIcon } from '../../data/svg';
import useOnScreen from '../../hooks/useOnScreen';
import Carousel from '../Carousel/Carousel';
import Section from '../Section/Section';

import styles from './About.module.scss';

const AboutItem = ({ item, ...rest }) => {
  const reference = useOnScreen('fade-in', 'fade-in--active');

  return (
    <li className={styles.item} ref={reference} {...rest}>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
    </li>
  );
};

const About = () => (
  <Section
    id="about"
    icon={aboutIcon}
    title="Who am I"
    subtitle="Discover the person behind the work: my passion, expertise, and experience that drive my creative vision."
  >
    <div className={styles.wrapper}>
      <ul className={styles.about}>
        <Carousel itemToShow={1} showIndicators>
          {about.map((item) => (
            <AboutItem key={item.title} item={item} />
          ))}
        </Carousel>
      </ul>
    </div>
  </Section>
);

export default About;
