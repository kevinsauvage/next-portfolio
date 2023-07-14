import Section from '@/components/_scopes/section/Section/Section';
import about from '@/data/about';
import useOnScreen from '@/hooks/useOnScreen';

import styles from './About.module.scss';

const AboutItem = ({ item, ...rest }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');

  return (
    <li className={styles.item} ref={reference} {...rest}>
      <p>{item.content}</p>
    </li>
  );
};

const About = ({ ...rest }) => (
  <Section {...rest}>
    <ul className={styles.about}>
      {about.map((item) => (
        <AboutItem key={item.content} item={item} />
      ))}
    </ul>
  </Section>
);

export default About;
