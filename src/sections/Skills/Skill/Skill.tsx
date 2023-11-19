import Image from 'next/image';

import styles from './Skill.module.scss';

type Properties = {
  item: {
    name: string;
    icon: string;
  };
};

const Project = ({ item }: Properties) => {
  const { name, icon } = item || {};

  return (
    <li className={styles.skill}>
      <Image src={icon} alt={name} width={90} height={90} />
      <p>{name}</p>
    </li>
  );
};

export default Project;
