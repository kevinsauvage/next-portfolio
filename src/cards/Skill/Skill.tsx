import { SkillType } from './types';

import styles from './Skill.module.scss';

type Properties = {
  item: SkillType;
};

const Project = ({ item }: Properties) => {
  const { name, icon } = item || {};

  return (
    <li className={styles.skill}>
      {icon}
      <p>{name}</p>
    </li>
  );
};

export default Project;
