import Animation from '@/components/Animation/Animation';
import competences from '@/config/skills';

import Skill from './Skill/Skill';

import styles from './Skills.module.scss';

const Skills = () => (
  <Animation
    duration={400}
    delay={0}
    iterationCount="1"
    timingFunction="ease-in-out"
    fillMode="forwards"
    animationKeyframes={['slide', 'fade-in']}
    initialStyle={{ opacity: 0, transform: 'translate(0px, 500px)' }}
  >
    <ul className={styles.items}>
      {competences.map((item) => (
        <Skill item={item} key={item.description} />
      ))}
    </ul>
  </Animation>
);

export default Skills;
