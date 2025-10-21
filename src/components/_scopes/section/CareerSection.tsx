import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './_components/Section';

import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

const CareerItem: React.FC<{
  company: string;
  description: string;
  period: string;
  position: string;
  location?: string;
  index: number;
}> = ({ company, description, period, position, location, index }) => {
  return (
    <BoxWithBackground
      className='group hover:-translate-y-1 transition-all duration-300'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
    >
      <div className='h-full w-full p-8'>
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0' />
        <div className='relative z-10 space-y-6'>
          {/* Header */}
          <div className='flex items-center gap-3 pb-4 border-b border-zinc-800'>
            <div className='p-2 bg-blue-500/10 rounded-lg border border-blue-500/20'>
              <Briefcase size={20} className='text-blue-400' />
            </div>
            <div className='flex-1'>
              <h3 className='text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors'>
                {company}
              </h3>
            </div>
            <span className='text-sm font-medium text-blue-400 whitespace-nowrap'>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Position & Meta */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <TrendingUp size={16} className='text-purple-400' />
              <p className='text-xl font-semibold text-zinc-200'>{position}</p>
            </div>
            <div className='flex flex-wrap gap-4 text-sm text-zinc-400'>
              <div className='flex items-center gap-2'>
                <Calendar size={14} className='text-zinc-500' />
                <span>{period}</span>
              </div>
              {location && (
                <div className='flex items-center gap-2'>
                  <MapPin size={14} className='text-zinc-500' />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className='text-zinc-400 leading-relaxed'>{description}</p>
        </div>
      </div>
    </BoxWithBackground>
  );
};

const CareerSection = () => {
  const jobs = [
    {
      company: 'Decathlon International',
      position: 'Senior Frontend Developer',
      period: 'October 2023 - Present',
      location: 'Remote',
      description:
        "Leading frontend development for Decathlon's global e-commerce platform serving 70+ countries. Architected performance optimizations that improved Core Web Vitals by 40%, implemented accessibility features reaching WCAG 2.1 AA compliance, and mentored a team of 5 developers. Technologies: React, Next.js, TypeScript, Svelte.",
    },
    {
      company: 'Decathlon Spain',
      position: 'Frontend Developer',
      period: 'May 2022 - October 2023',
      location: 'Barcelona, Spain',
      description:
        "Optimized Decathlon Spain's e-commerce platform, achieving 30% faster page load times and 25% improvement in conversion rates. Implemented responsive design patterns and accessibility enhancements that increased user engagement by 20%. Led the migration from legacy jQuery to modern React architecture.",
    },
    {
      company: 'Subforce',
      position: 'Frontend Developer',
      period: 'June 2021 - May 2022',
      location: 'France',
      description:
        'Developed custom web solutions for 15+ local businesses, from landing pages to full e-commerce platforms. Specialized in WordPress customization, React development, and SEO optimization. Delivered projects that increased client online presence by an average of 150%.',
    },
  ];

  return (
    <Section id='career'>
      <div className='space-y-16'>
        {/* Header Section */}
        <div className='space-y-6'>
          <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>Career</p>
          <h2 className='text-4xl md:text-6xl font-bold'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
              Professional Journey
            </span>
          </h2>
          <p className='text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl'>
            My career path reflects a commitment to growth, innovation, and delivering exceptional
            user experiences across diverse industries.
          </p>
        </div>

        {/* Jobs Timeline */}
        <div className='space-y-6'>
          {jobs.map((job, index) => (
            <CareerItem key={index} {...job} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CareerSection;
