import BoxWithBackground from '@/components/BoxWithBackground';
import GlowEffect from '@/components/GlowEffect';

import Section from './_components/Section';

import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

const CareerItem: React.FC<{
  company: string;
  description?: string;
  descriptionArray?: string[];
  period: string;
  position: string;
  location?: string;
  index: number;
}> = ({ company, description, period, position, location, index }) => {
  return (
    <BoxWithBackground
      className='group hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
    >
      <article
        className='h-full w-full p-8 relative overflow-hidden'
        aria-labelledby={`career-${index}`}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0 group-hover:from-zinc-900 group-hover:via-zinc-900/90 transition-all duration-500' />
        <GlowEffect variant='blue-purple' intensity='low' />
        <div className='relative z-10 space-y-6'>
          {/* Header */}
          <div className='flex items-center gap-3 pb-4 border-b border-zinc-800'>
            <div className='p-2 bg-blue-500/10 rounded-lg border border-blue-500/20'>
              <Briefcase size={20} className='text-blue-400' aria-hidden='true' />
            </div>
            <div className='flex-1'>
              <h3
                id={`career-${index}`}
                className='text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors'
              >
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
              <TrendingUp size={16} className='text-purple-400' aria-hidden='true' />
              <p className='text-xl font-semibold text-zinc-200'>{position}</p>
            </div>
            <div className='flex flex-wrap gap-4 text-sm text-zinc-400'>
              <div className='flex items-center gap-2'>
                <Calendar size={14} className='text-zinc-500' aria-hidden='true' />
                <span>{period}</span>
              </div>
              {location && (
                <div className='flex items-center gap-2'>
                  <MapPin size={14} className='text-zinc-500' aria-hidden='true' />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className='text-zinc-300 leading-relaxed'>{description}</p>
        </div>
      </article>
    </BoxWithBackground>
  );
};

const CareerSection = () => {
  const jobs = [
    {
      company: 'Decathlon International',
      position: 'Frontend Developer',
      period: 'October 2023 - Present',
      location: 'Remote',
      descriptionArray: [
        'Created a scalable, reusable Svelte component library that improved performance and consistency of the platform for e-commerce sites in 15+ countries.',
        'Led A/B tests for new features that resulted in observed improvements in user adoption and conversion rates.',
        'Collaborated with product designers in Figma and Storybook, translating designs into high-quality production-ready code.',
        'Developed and implemented a robust test suite (Jest, Cypress) to increase code confidence and reduce bugs.',
        'Collaborated with cross-country teams to define feature configurations and manage feature requests, ensuring alignment across international markets.',
      ],
      description:
        'At Decathlon International, I built a scalable Svelte component library used across e-commerce platforms in over 15 countries, enhancing performance and visual consistency. I also led A/B testing initiatives, implemented end-to-end testing strategies with Jest and Cypress, and collaborated closely with international teams and designers using Figma and Storybook to deliver high-quality, production-ready UI components.',
    },
    {
      company: 'Decathlon Spain',
      position: 'Frontend Developer',
      period: 'May 2022 - October 2023',
      location: 'Barcelona, Spain',
      descriptionArray: [
        'Improved the core web vitals and made the Decathlon Spain online store more accessible.',
        'Created modular, reusable Svelte components to ease the development of new features.',
        'Developed automated testing frameworks (unit and integration) that ensured stability of the platform.',
        'Reviewed performance metrics collection and analytics tools to identify and resolve performance issues, reducing average load time by 1.5 seconds.',
        'Implemented accessibility standards (WCAG 2.1), making applications more inclusive for all users.',
        'Documented technical solutions and best practices to improve team knowledge sharing.',
      ],
      description:
        'Focused on performance and accessibility improvements for Decathlon Spain’s e-commerce platform, optimizing Core Web Vitals and reducing load times significantly. I contributed reusable Svelte components, introduced automated unit and integration testing, and implemented accessibility standards (WCAG 2.1) to ensure inclusivity, while also maintaining comprehensive documentation to support internal knowledge sharing.',
    },
    {
      company: 'Subforce',
      position: 'Frontend Developer',
      period: 'June 2021 - May 2022',
      location: 'France (Remote)',
      descriptionArray: [
        'Created comprehensive web applications on both the client and server-side using React.js and Next.js with secure integrations through backends.',
        'Designed and built scalable state management components using Redux and Context API.',
        'Developed secure user authentication systems and streamlined form validation processes to ensure data integrity.',
        'Designed and created accessible and easy-to-use user-facing form components.',
        'Refactored legacy codebases to modern JavaScript standards, enhancing maintainability and reducing bugs.',
      ],
      description:
        'At Subforce, I developed full-stack web applications using React.js and Next.js, integrating with secure backend systems. I designed scalable state management solutions with Redux and Context API, built user-friendly and accessible form components, and improved application reliability by modernizing legacy codebases and implementing secure authentication and validation flows.',
    },
  ];

  return (
    <Section id='career'>
      <div className='space-y-20'>
        {/* Header Section */}
        <div className='space-y-6'>
          <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>Career</p>
          <h2 className='text-4xl md:text-6xl font-bold'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
              Professional Journey
            </span>
          </h2>
          <p className='text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl'>
            My career path reflects a commitment to growth, innovation, and delivering exceptional
            user experiences across diverse industries.
          </p>
        </div>

        {/* Jobs Timeline */}
        <div className='space-y-8'>
          {jobs.map((job, index) => (
            <CareerItem key={index} {...job} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CareerSection;
