import Section from '@/components/_scopes/section/Section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import Accordion from '@/components/Accordion/Accordion';
import AnimatedContainer from '@/components/AnimatedContainer/AnimatedContainer';
import sections, { Sections } from '@/config/sections';
import { breakpoints } from '@/utils/breakpoints';

import Skill from '../../_cards/Skill/Skill';

import skills from './skills.config';

import styles from './Skills.module.scss';

const label = 'My Skills';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

const Skills = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <AnimatedContainer
      from={{ opacity: 0, x: 'random([120, 130, 140])', y: 'random([-120, -130, -140])' }}
      to={{
        duration: 0.01,
        opacity: 1,
        stagger: {
          each: 0.05,
          from: 'random',
        },
        x: 0,
        y: 0,
      }}
      timelineOptions={{
        scrollTrigger: {
          start: 'top 80%',
        },
      }}
      triggerClassName=".animated-skills"
    >
      <Accordion
        className={styles.skills}
        Tag="ul"
        totalVisible={{
          [breakpoints.sm]: 9,
          [breakpoints.md]: 12,
          [breakpoints.xxl]: 15,
        }}
        defaultVisible={15}
      >
        {skills.map((item) => (
          <Skill key={item.name} item={item} className="animated-skills" />
        ))}
      </Accordion>
    </AnimatedContainer>
  </Section>
);

export default Skills;
