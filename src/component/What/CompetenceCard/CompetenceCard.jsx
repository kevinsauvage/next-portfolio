import styles from './CompetenceCard.module.scss';

const CompetenceCard = ({ item }) => (
  <div className={styles.item}>
    {item?.icon}
    <p>{item?.description}</p>
  </div>
);

export default CompetenceCard;
