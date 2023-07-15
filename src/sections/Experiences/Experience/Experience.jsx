import Animation from '@/components/Animation/Animation';
import useOnScreen from '@/hooks/useOnScreen';

import styles from './Experience.module.scss';

const Experience = ({ experience }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');
  const { title, description, period } = experience;

  return (
    <Animation
      duration={400}
      delay={0}
      iterationCount="1"
      timingFunction="ease-in-out"
      fillMode="forwards"
      animationKeyframes={['slide', 'fadeIn']}
      initialStyle={{ opacity: 0, transform: 'translate(0px, 500px)' }}
    >
      <li className={styles.card} ref={reference}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.period}>{period}</p>
        <p className={styles.description}>{description}</p>
      </li>
    </Animation>
  );
};

export default Experience;
