import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import Accordion from '@/components/Accordion/Accordion';
import sections, { Sections } from '@/config/sections';
import skills from '@/config/skills';
import { breakpoints } from '@/utils/breakpoints';

import SkillCard from './Skill/Skill';

import styles from './Skills.module.scss';

const label = 'My Skills';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, tagLevel } = section || {};

const Skills = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} tagLevel={tagLevel} />
      <Accordion
        className={styles.skills}
        Tag="ul"
        totalVisible={{
          [breakpoints.sm]: 9,
          [breakpoints.md]: 12,
          [breakpoints.xxl]: 15,
          default: 15,
        }}
      >
        {skills.map((item) => (
          <SkillCard key={item.name} item={item} />
        ))}
      </Accordion>
    </Section>
  </SectionPresenter>
);

export default Skills;
