import about from '../../data/about';
import { aboutIcon } from '../../data/svg';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import styles from './About.module.scss';

const About = () => (
  <Section id="about">
    <UpTitle text="About" icon={aboutIcon} />
    <Title subtitle="Discover the person behind the work: my passion, expertise, and experience that drive my creative vision.">
      Who am I
    </Title>
    <div>
      <div className={styles.wrapper}>
        <ul className={styles.about}>
          {about.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

export default About;
