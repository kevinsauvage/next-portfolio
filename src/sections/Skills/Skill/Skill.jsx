import styles from './Skill.module.scss';

const Skill = ({ item }) => (
  <li className={styles.item}>
    <div className={styles.icon}>{item?.icon}</div>
    <p>{item?.description}</p>
  </li>
);

export default Skill;
