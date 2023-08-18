import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';
import about from '@/config/about';

import styles from './About.module.scss';

const AboutItem = ({ item }) => (
  <InViewAnimation
    hidden={{ opacity: 0, y: '100px' }}
    visible={{ opacity: 1, y: '0px' }}
    tag="li"
    className={styles.item}
  >
    <p>{item.content}</p>
  </InViewAnimation>
);

const About = () => (
  <ul className={styles.about}>
    {about.map((item) => (
      <AboutItem key={item.content} item={item} />
    ))}
  </ul>
);

export default About;
