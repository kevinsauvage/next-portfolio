import { SkillType } from './types';

import styles from './Skill.module.scss';

type Properties = {
  item: SkillType;
} & React.HTMLAttributes<HTMLLIElement>;

const Project = ({ item, className, ...rest }: Properties) => {
  const { name, icon } = item || {};

  return (
    <li className={`${styles.skill} ${className}`} {...rest}>
      {icon}
      <p>{name}</p>
    </li>
  );
};

export default Project;
