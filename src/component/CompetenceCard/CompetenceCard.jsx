import FadeIn from '../FadeIn/FadeIn';

import styles from './CompetenceCard.module.scss';

const CompetenceCard = ({ item }) => (
  <FadeIn>
    <div className={styles.item}>
      {item?.icon}
      <p>{item?.description}</p>
    </div>
  </FadeIn>
);

export default CompetenceCard;
