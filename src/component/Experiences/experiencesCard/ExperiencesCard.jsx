import FadeIn from '../../FadeIn/FadeIn';

import styles from './ExperiencesCard.module.scss';

const ExperiencesCard = ({ experience }) => {
  const { title, description, period } = experience;

  return (
    <li className={styles.card}>
      <FadeIn>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.period}>{period}</p>
        <p className={styles.description}>{description}</p>
      </FadeIn>
    </li>
  );
};

export default ExperiencesCard;
