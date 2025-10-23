import { Card, CardContent, CardIcon } from '@/components/Card';
import { Body, BodyLarge, H2, H3, H5, Overline } from '@/components/Typography';
import { passions } from '@/config/passions.config';
import { gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import Section from './_components/Section';

import clsx from 'clsx';

const PassionCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}> = ({ icon: Icon, title, description, index }) => {
  return (
    <Card
      hover='standard'
      size='md'
      glow='secondary-accent'
      animationIndex={index}
      aria-label={title}
    >
      <CardContent spacing='md'>
        <CardIcon variant='primary'>
          <Icon
            className='text-white transition-transform group-hover:rotate-12'
            size={iconSizes.lg}
            strokeWidth={1.5}
            aria-hidden='true'
          />
        </CardIcon>
        <H5 className='group-hover:text-accent-400 transition-all duration-300'>{title}</H5>
        <Body className='group-hover:text-zinc-200 transition-colors'>{description}</Body>
      </CardContent>
    </Card>
  );
};

const AboutSection: React.FC = () => {
  return (
    <Section id='about'>
      <div className={clsx(stackSpacing['2xl'])}>
        {/* Hero Section */}
        <div
          className={clsx(stackSpacing.md, 'animate-fade-in-up opacity-0')}
          style={{ animationFillMode: 'both' }}
        >
          <Overline>About me</Overline>
          <H2 gradient className='animate-gradient bg-[length:200%_auto]'>
            Hi, I&apos;m Kévin Sauvage
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
              <span className='text-lg font-semibold text-blue-400'>4+ Years Experience</span>
            </div>
          </div>
          <BodyLarge
            className='max-w-4xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            I&apos;m a Frontend Developer in Barcelona, crafting high-performance, accessible web
            applications. With over four years of experience, I specialize in building modern
            solutions with React and Next.js that are both user-centric and robust.
          </BodyLarge>
        </div>

        {/* Passion Cards */}
        <div className={stackSpacing.md}>
          <H3 className='animate-fade-in-up opacity-0' style={{ animationFillMode: 'both' }}>
            My Philosophy
          </H3>
          <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', gapSpacing.lg)}>
            {passions.map((passion, index) => (
              <PassionCard key={passion.title} {...passion} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
