import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './Section';
import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionTitle from './SectionTitle';

import clsx from 'clsx';

const POSITION = 'Frontend Developer';

const items = [
  {
    description:
      "Working on Decathlon's e-commerce platform, I build and improve user interfaces using JavaScript and Svelte. I'm part of an international team that makes sure our online shopping experience works well across different countries.",
    period: 'October 2023 - Present',
    position: POSITION,
    title: 'Decathlon International',
  },
  {
    description:
      "I worked on making Decathlon Spain's online store better for everyone. My focus was on speed and accessibility - basically making sure the site was fast and easy to use for all our customers.",
    period: 'May 2022 - October 2023',
    position: POSITION,
    title: 'Decathlon Spain',
  },
  {
    description:
      'Subforce is a small agency that builds websites for local businesses. I worked on a range of projects, from simple landing pages to full e-commerce sites.',
    period: 'June 2021 - May 2022',
    position: POSITION,
    title: 'Subforce',
  },
];

const ExperienceItem: React.FC<{
  title: string;
  description: string;
  period: string;
  style?: string;
  position: string;
}> = ({ title, description, period, style, position }) => {
  return (
    <BoxWithBackground className={clsx('flex flex-col justify-between items-center', style)}>
      <div className="pb-8 w-full">
        <p className="text-zinc-400 text-base font-light whitespace-nowrap mb-4">{period}</p>
        <div className="gap-10 md:flex md:items-end md:justify-between w-full">
          <h3 className="text-2xl font-medium text-zinc-200 mb-3 leading-5 font-heading">
            {title}
          </h3>
          <p className="text-zinc-300 font-light text-xl whitespace-nowrap">{position}</p>
        </div>
      </div>
      <div>
        <p className="text-zinc-200 font-light text-lg leading-6">{description}</p>
      </div>
    </BoxWithBackground>
  );
};

const ExperienceSection: React.FC = () => {
  return (
    <Section id="career" className="lg:flex gap-10">
      <SectionHeader>
        <SectionTitle>My Career Journey</SectionTitle>
        <SectionDescription>
          I&apos;ve been fortunate to work with some amazing companies and talented people. Here are
          some of the highlights from my career so far.
        </SectionDescription>
      </SectionHeader>
      <div className="grid items-stretch grid-cols-1 gap-5">
        {items.map((item, index) => (
          <ExperienceItem key={index} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection;