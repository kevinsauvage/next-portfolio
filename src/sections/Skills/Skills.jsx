import competences from '@/config/skills';
import useOnScreen from '@/hooks/useOnScreen';

import Skill from './Skill/Skill';

import styles from './Skills.module.scss';

const Skills = () => {
  const { reference, isIntersecting } = useOnScreen(false);
  return (
    <ul className={styles.items} ref={reference}>
      {competences.map((item) => (
        <Skill
          item={item}
          key={item.description}
          className={isIntersecting ? 'fade-in slide' : ''}
        />
      ))}
    </ul>
  );
};

export default Skills;
