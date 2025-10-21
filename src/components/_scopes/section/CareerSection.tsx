import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

import clsx from 'clsx';

const CareerItem: React.FC<{
  company: string;
  description: string;
  period: string;
  position: string;
}> = ({ company, description, period, position }) => {
  return (
    <>
      <p className='text-zinc-300 text-base font-light whitespace-nowrap'>{period}</p>
      <BoxWithBackground>
        <div
          className={clsx(
            'p-6 flex flex-col justify-between items-center',
            'bg-gradient-to-t from-zinc-950 to-zinc-900/70'
          )}
        >
          <div className='pb-8 w-full flex flex-col justify-between sm:items-center gap-y-2 gap-x-12 flex-wrap sm:flex-row'>
            <h3 className='text-2xl font-medium text-zinc-200 leading-5 font-heading text-nowrap'>
              {company}
            </h3>
            <p className='text-zinc-300 font-light text-xl whitespace-nowrap'>{position}</p>
          </div>
          <div>
            <p className='text-zinc-300 font-light text-xl leading-6'>{description}</p>
          </div>
        </div>
      </BoxWithBackground>
    </>
  );
};

const CareerSection = () => {
  const jobs = [
    {
      company: 'Decathlon International',
      position: 'Senior Frontend Developer',
      period: 'October 2023 - Present',
      description:
        "Leading frontend development for Decathlon's global e-commerce platform serving 70+ countries. Architected performance optimizations that improved Core Web Vitals by 40%, implemented accessibility features reaching WCAG 2.1 AA compliance, and mentored a team of 5 developers. Technologies: React, Next.js, TypeScript, Svelte.",
    },
    {
      company: 'Decathlon Spain',
      position: 'Frontend Developer',
      period: 'May 2022 - October 2023',
      description:
        "Optimized Decathlon Spain's e-commerce platform, achieving 30% faster page load times and 25% improvement in conversion rates. Implemented responsive design patterns and accessibility enhancements that increased user engagement by 20%. Led the migration from legacy jQuery to modern React architecture.",
    },
    {
      company: 'Subforce',
      position: 'Frontend Developer',
      period: 'June 2021 - May 2022',
      description:
        'Developed custom web solutions for 15+ local businesses, from landing pages to full e-commerce platforms. Specialized in WordPress customization, React development, and SEO optimization. Delivered projects that increased client online presence by an average of 150%.',
    },
  ];

  return (
    <Section id='career' className='lg:grid lg:grid-cols-5 gap-20'>
      <SectionHeader className='col-span-2'>
        <SectionTitle>Professional Journey</SectionTitle>
        <SectionDescription>
          My career path reflects a commitment to growth, innovation, and delivering exceptional
          user experiences across diverse industries.
        </SectionDescription>
      </SectionHeader>
      <div className='grid items-stretch grid-cols-1 gap-5 lg:col-span-3'>
        {jobs.map((item, index) => (
          <CareerItem key={index} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default CareerSection;
