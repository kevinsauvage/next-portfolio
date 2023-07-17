import Section from '@/components/_scopes/section/Section/Section';
import Animation from '@/components/Animation/Animation';
import about from '@/config/about';

import styles from './About.module.scss';

const AboutItem = ({ item, ...rest }) => (
  <li className={styles.item} {...rest}>
    <p>{item.content}</p>
  </li>
);

const About = ({ ...rest }) => (
  <Section {...rest}>
    <Animation
      duration={400}
      delay={0}
      iterationCount="1"
      timingFunction="ease-in-out"
      fillMode="forwards"
      animationKeyframes={['slide', 'fadeIn']}
      initialStyle={{ opacity: 0, transform: 'translate(1000px, 0px)' }}
    >
      <ul className={styles.about}>
        {about.map((item) => (
          <AboutItem key={item.content} item={item} />
        ))}
      </ul>
    </Animation>
  </Section>
);

export default About;
