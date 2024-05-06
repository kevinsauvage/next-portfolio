import Link from 'next/link';

import Section from '@/components/_scopes/section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUpTitle';
import AnimatedContainer from '@/components/AnimatedContainer';
import TabList from '@/components/TabList';
import experiences from '@/config/experience.config';
import sections, { Sections } from '@/config/sections';

const label = 'My Experience';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

type ExperienceType = {
  title: string;
  period: string;
  description: string;
  company: { name: string; link: string };
  listItem: Array<string>;
};

type Properties = { experience: ExperienceType };

const Experience = ({ experience }: Properties) => {
  const { title: experienceTitle, period, company, listItem, description } = experience;

  return (
    <div role="tabpanel">
      <h3 className="flex flex-wrap text-2xl gap-4">
        <span className="font-semibold">{experienceTitle}</span>
        <Link
          className="text-blue-500 underline font-semibold"
          href={company.link}
          target="_blank"
          rel="noopener noreferrer"
          title={`Go to ${company.name} website`}
        >
          @ {company.name}
        </Link>
      </h3>
      <p className="text-sm mb-6">{period}</p>
      <p className="text-lg mb-4">{description}</p>
      <ul className="">
        {listItem.map((item) => (
          <li key={item} className="text-lg flex">
            <span className="block text-blue-500 font-bold mr-4 text-xl">- </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Experiences = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <AnimatedContainer
      className="will-change-auto origin-top"
      from={{ opacity: 0, y: 200 }}
      to={{ duration: 0.3, opacity: 1, y: 0 }}
      timelineOptions={{ scrollTrigger: { start: 'top bottom' } }}
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
