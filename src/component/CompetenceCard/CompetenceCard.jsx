import competences from '../../data/competences';
import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';

import styles from './CompetenceCard.module.scss';

const CompetenceCard = () => (
  <SlideUpAndFadeIn className={styles.CompetenceCard}>
    <div className={styles.items}>
      {competences.map((item) => (
        <div className={styles.item} key={item.description}>
          <i className={item.icon} />
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  </SlideUpAndFadeIn>
);

export default CompetenceCard;
