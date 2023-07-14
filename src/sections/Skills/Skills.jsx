import Section from '@/components/_scopes/section/Section/Section';
import competences from '@/data/skills';

import Skill from './Skill/Skill';

import styles from './Skills.module.scss';

const Skills = ({ ...rest }) => (
  <Section {...rest}>
    <div className={styles.items}>
      {competences.map((item) => (
        <Skill item={item} key={item.description} />
      ))}
    </div>
  </Section>
);

export default Skills;
