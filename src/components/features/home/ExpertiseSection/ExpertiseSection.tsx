import { Card, CardContent } from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { sections } from '@/config/content';
import expertise from '@/config/content/expertises';

import { Check } from 'lucide-react';
import ExpertiseCard from './ExpertiseCard';

const ExpertiseSection: React.FC = () => {
  return (
    <Section id='expertise'>
      <div className='space-y-16 sm:space-y-24 md:space-y-32'>
        <div
          className='space-y-6 animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <p className='text-sm font-medium text-primary-400 tracking-wider uppercase'>
            {sections.expertise.overline}
          </p>
          <h2 className='text-4xl md:text-6xl font-bold'>
            <span className='bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text'>
              {sections.expertise.title}
            </span>
          </h2>
          <p
            className='text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            {sections.expertise.description}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {expertise.map((item, index) => (
            <ExpertiseCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ExpertiseSection;
