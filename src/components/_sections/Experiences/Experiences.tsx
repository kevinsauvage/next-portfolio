import Section from '@/components/_scopes/section/Section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import AnimatedContainer from '@/components/AnimatedContainer/AnimatedContainer';
import TabList from '@/components/TabList/TabList';
import sections, { Sections } from '@/config/sections';

import Experience from '../../_cards/Experience/Experience';

import experiences from './experiences.config';

const label = 'My Experience';

const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

const Experiences = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <AnimatedContainer
      from={{ opacity: 0, y: 200 }}
      to={{
        duration: 0.3,
        opacity: 1,
        y: 0,
      }}
      timelineOptions={{
        scrollTrigger: {
          start: 'top bottom',
        },
      }}
      style={{
        transformOrigin: 'top',
        willChange: 'transform, opacity',
      }}
    >
      <TabList items={experiences.map((experience) => experience.tab)}>
        {experiences.map((experience) => (
          <Experience key={experience.period} experience={experience} />
        ))}
      </TabList>
    </AnimatedContainer>
  </Section>
);

export default Experiences;
