import useOnScreen from '@/hooks/useOnScreen';

import styles from './Experience.module.scss';

const Experience = ({ experience }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');
  const { title, description, period } = experience;

  return (
    <li className={styles.card} ref={reference}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.period}>{period}</p>
      <p className={styles.description}>{description}</p>
    </li>
  );
};

export default Experience;