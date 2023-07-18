import styles from './Skill.module.scss';

const Skill = ({ item, className = '' }) => (
  <li className={`${styles.item} ${className}`}>
    <div className={styles.icon}>{item?.icon}</div>
    <p>{item?.description}</p>
  </li>
);

export default Skill;
