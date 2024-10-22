import Link from 'next/link';

import Section from '@/components/_scopes/section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle';
import experiences from '@/config/experience.config';
import sections, { Sections } from '@/config/sections';

const label = 'My Experience';
const section = sections.find((data) => data.label === label) as Sections[0];
const { title, position } = section || {};

type ExperienceType = {
  title: string;
  period: string;
  description?: string;
  company: { name: string; link: string; small?: string };
  listItem: Array<string>;
};

type Properties = { experience: ExperienceType };

const Experience = ({ experience }: Properties) => {
  const { title: experienceTitle, period, company, listItem, description } = experience;

  return (
    <div className="mb-10">
      <h3 className="text-3xl gap-2 font-semibold">{experienceTitle}</h3>
      <Link
        className="text-blue-500 underline font-normal text-xl mb-2 block"
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        title={`Go to ${company.name} website`}
      >
        @ {company.name} {company.small}
      </Link>
      <p className="text-gray-400 font-normal mb-6">{period}</p>
      <p className="text-lg mb-4">{description}</p>
      <ul className="">
        {listItem.map((item) => (
          <li key={item} className="text-lg md:text-xl flex">
            <span className="block text-blue-500 font-bold mr-4 ">- </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Experiences = () => (
  <Section id={section.id}>
    <SectionTitle title={title} position={position} />
    {experiences.map((experience) => (
      <Experience key={experience.period} experience={experience} />
    ))}
  </Section>
);

export default Experiences;
