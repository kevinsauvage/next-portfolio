import { Card, CardContent } from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import expertise from '@/config/content/expertises';
import { sections } from '@/config/content';

import { Check } from 'lucide-react';

const ExpertiseCard: React.FC<{
  title: string;
  content: string;
  keyPoints: string[];
  index: number;
}> = ({ title, content, keyPoints, index }) => {
  return (
    <Card
      hover='subtle'
      size='md'
      glow='primary-secondary'
      animationIndex={index}
      className='group relative h-full'
    >
      <CardContent spacing='lg' className='relative z-10 h-full'>
        <div className='space-y-6'>
          <div className='space-y-3'>
            <h3 className='text-2xl font-bold text-zinc-100 group-hover:text-accent-400 transition-all duration-300'>
              {title}
            </h3>
            <p className='text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors'>
              {content}
            </p>
          </div>
          <ul className='space-y-3' aria-label='Key points'>
            {keyPoints.map(point => (
              <li key={point} className='flex items-center gap-3'>
                <div className='mt-0.5 flex-shrink-0'>
                  <div className='p-1 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300'>
                    <Check className='w-3.5 h-3.5 text-white' aria-hidden='true' />
                  </div>
                </div>
                <span className='text-zinc-300 group-hover:text-zinc-200 transition-colors'>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

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
