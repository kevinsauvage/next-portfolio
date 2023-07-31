import Animation from '@/components/Animation/Animation';
import about from '@/config/about';

import styles from './About.module.scss';

const AboutItem = ({ item, ...rest }) => (
  <li className={styles.item} {...rest}>
    <p>{item.content}</p>
  </li>
);

const About = () => (
  <Animation
    animationKeyframes={['slide', 'fade-in']}
    initialStyle={{ opacity: 0, transform: 'translate(200px, 0px)' }}
  >
    <ul className={styles.about}>
      {about.map((item) => (
        <AboutItem key={item.content} item={item} />
      ))}
    </ul>
  </Animation>
);

export default About;
