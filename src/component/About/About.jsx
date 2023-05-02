import about from '../../data/about';
import { aboutIcon } from '../../data/svg';
import FadeIn from '../FadeIn/FadeIn';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import styles from './About.module.scss';

const About = () => (
  <Section id="about">
    <UpTitle text="About" icon={aboutIcon} />
    <Title>Who am I</Title>
    <div>
      <div className={styles.wrapper}>
        <ul className={styles.about}>
          {about.map((item) => (
            <li key={item.title}>
              <FadeIn>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

export default About;
