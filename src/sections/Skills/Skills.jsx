import Section from '@/components/_scopes/section/Section/Section';
import Animation from '@/components/Animation/Animation';
import competences from '@/data/skills';

import Skill from './Skill/Skill';

import styles from './Skills.module.scss';

const Skills = ({ ...rest }) => (
  <Section {...rest}>
    <Animation
      duration={400}
      delay={0}
      iterationCount="1"
      timingFunction="ease-in-out"
      fillMode="forwards"
      animationKeyframes={['slide', 'fadeIn']}
      initialStyle={{ opacity: 0, transform: 'translate(0px, 500px)' }}
    >
      <ul className={styles.items}>
        {competences.map((item) => (
          <Skill item={item} key={item.description} />
        ))}
      </ul>
    </Animation>
  </Section>
);

export default Skills;
