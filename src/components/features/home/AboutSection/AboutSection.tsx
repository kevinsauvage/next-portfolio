import Section from '@/components/ui/Section';
import { BodyLarge, H2, H3, Overline } from '@/components/ui/Typography';
import { passions, sections } from '@/config/content';
import { gapSpacing, stackSpacing } from '@/design-system/tokens';

import PassionCard from './PassionCard';

import clsx from 'clsx';

const AboutSection: React.FC = () => {
  return (
    <Section id='about'>
      <div className={clsx(stackSpacing['2xl'])}>
        <div
          className={clsx(stackSpacing.md, 'animate-fade-in-up opacity-0')}
          style={{ animationFillMode: 'both' }}
        >
          <Overline>{sections.about.overline}</Overline>
          <H2
            gradient
            className='animate-gradient bg-[length:200%_auto] text-4xl md:text-5xl lg:text-6xl'
          >
            {sections.about.title}
          </H2>
          <div
            className={clsx(
              gapSpacing.md,
              'flex flex-wrap items-center animate-fade-in-up opacity-0'
            )}
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <div className='flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm'>
              <div className='h-2 w-2 rounded-full bg-blue-400 animate-pulse' />
              <span className='text-lg font-semibold text-blue-400'>
                {sections.about.experience}
              </span>
            </div>
          </div>
          <BodyLarge
            className='max-w-4xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {sections.about.description}
          </BodyLarge>
        </div>

        <div className={stackSpacing.md}>
          <H3 className='animate-fade-in-up opacity-0' style={{ animationFillMode: 'both' }}>
            My Philosophy
          </H3>
          <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', gapSpacing.lg)}>
            {passions.map((passion, index) => (
              <PassionCard key={passion.slug} {...passion} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
