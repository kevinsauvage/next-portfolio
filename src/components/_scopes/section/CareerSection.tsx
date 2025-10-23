import BoxWithBackground from '@/components/BoxWithBackground';
import GlowEffect from '@/components/GlowEffect';
import { jobs } from '@/config/jobs.config';

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
      className='group hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
    >
      <article
        className='h-full w-full p-8 relative overflow-hidden'
        aria-labelledby={`career-${index}`}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0 group-hover:from-zinc-900 group-hover:via-zinc-900/90 transition-all duration-500' />
        <GlowEffect variant='primary-secondary' intensity='low' />
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
  return (
    <Section id='career'>
      <div className='space-y-32'>
        {/* Header Section */}
        <div className='space-y-6'>
          <p className='text-sm font-medium text-primary-400 tracking-wider uppercase'>Career</p>
          <h2 className='text-4xl md:text-6xl font-bold'>
            <span className='bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text'>
              Professional Journey
            </span>
          </h2>
          <p className='text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl'>
            Evolving through roles dedicated to innovation, quality, and the relentless pursuit of
            better user experiences.
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
