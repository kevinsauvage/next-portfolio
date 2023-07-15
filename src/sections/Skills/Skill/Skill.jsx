import styles from './Skill.module.scss';

const Skill = ({ item }) => (
  <li className={styles.item}>
    {item?.icon}
    <p>{item?.description}</p>
  </li>
);

export default Skill;
