import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';

import styles from './CompetenceCard.module.scss';

const CompetenceCard = ({ item }) => (
  <SlideUpAndFadeIn>
    <div className={styles.item}>
      {item?.icon}
      <p>{item?.description}</p>
    </div>
  </SlideUpAndFadeIn>
);

export default CompetenceCard;
