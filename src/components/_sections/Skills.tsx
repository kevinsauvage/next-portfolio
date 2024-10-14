import { cloneElement } from 'react';

import Section from '@/components/_scopes/section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUpTitle';
import sections, { Sections } from '@/config/sections';
import skills from '@/config/skills.config';

const label = 'My Skills';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

type SkillType = { name: string; icon: JSX.Element };

type Properties = { item: SkillType } & React.HTMLAttributes<HTMLLIElement>;

const Skill = ({ item, ...rest }: Properties) => {
  return (
    <li
      className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg bg-blue-950 text-blue-400 border border-blue-500"
      {...rest}
    >
      {cloneElement(item.icon, { role: 'presentation', size: 50, strokeWidth: 1.5 })}
      <p>{item.name}</p>
    </li>
  );
};

const Skills = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <ul className="grid grid-cols-4 gap-2 mt-10 will-change-auto md:grid-cols-6 xxl:grid-cols-8">
      {skills.map((item) => (
        <Skill item={item} key={item.name} />
      ))}
    </ul>
  </Section>
);

export default Skills;
