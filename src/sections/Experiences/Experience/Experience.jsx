import Animation from '@/components/Animation/Animation';

import styles from './Experience.module.scss';

const Experience = ({ experience }) => {
  const { title, description, period } = experience;

  return (
    <li>
      <Animation
        duration={400}
        delay={0}
        iterationCount="1"
        timingFunction="ease-in-out"
        fillMode="forwards"
        animationKeyframes={['slide', 'fade-in']}
        initialStyle={{ opacity: 0, transform: 'translate(0px, 500px)' }}
      >
        <div className={styles.card}>
          <p className={styles.title}>{title}</p>
          <p className={styles.period}>{period}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </Animation>
    </li>
  );
};

export default Experience;
