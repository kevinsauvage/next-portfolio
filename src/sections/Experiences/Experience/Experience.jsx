import Animation from '@/components/Animation/Animation';

import styles from './Experience.module.scss';

const Experience = ({ experience }) => {
  const { title, period, listItem } = experience;

  return (
    <li>
      <Animation
        duration={1000}
        delay={100}
        animationKeyframes={['slide', 'fade-in']}
        initialStyle={{ opacity: 0, transform: 'translate(0px, 100px)' }}
      >
        <div className={styles.card}>
          <p className={styles.title}>{title}</p>
          <p className={styles.period}>{period}</p>
          <ul className={styles.list}>
            {listItem.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Animation>
    </li>
  );
};

export default Experience;
