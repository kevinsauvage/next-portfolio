import useOnScreen from '../../../hooks/useOnScreen';

import styles from './CompetenceCard.module.scss';

const CompetenceCard = ({ item }) => {
  const reference = useOnScreen('fade-in', 'fade-in--active');
  return (
    <div ref={reference} className={styles.item}>
      {item?.icon}
      <p>{item?.description}</p>
    </div>
  );
};

export default CompetenceCard;
