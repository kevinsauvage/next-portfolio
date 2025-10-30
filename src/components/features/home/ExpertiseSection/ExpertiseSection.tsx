import Section from '@/components/ui/Section';
import { BodyLarge, H2, Overline } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import expertise from '@/config/content/expertises';

import ExpertiseCard from './ExpertiseCard';

const ExpertiseSection: React.FC = () => {
  return (
    <Section id='expertise'>
      <div className='space-y-16 sm:space-y-24 md:space-y-32'>
        <div
          className='space-y-6 animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <Overline>{sections.expertise.overline}</Overline>
          <H2 className='bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text'>
            {sections.expertise.title}
          </H2>
          <BodyLarge
            className='max-w-4xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            {sections.expertise.description}
          </BodyLarge>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {expertise.map((item, index) => (
            <ExpertiseCard key={item.slug} {...item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ExpertiseSection;
