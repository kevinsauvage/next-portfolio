import Link from 'next/link';

import BoxWithBackground from '@/components/shared/BoxWithBackground';
import Button from '@/components/ui/Button';
import { BodyLarge, BodySmall, Display } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { animations, gapSpacing, iconSizes } from '@/design-system/tokens';

import clsx from 'clsx';
import { Mail, MoveDown, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Products Scaled', value: '5+' },
  { label: 'Pull Requests Merged', value: '400+' },
  { label: 'Users Impacted', value: '1M+' },
];

const Hero = () => {
  return (
    <BoxWithBackground
      className='relative p-0 gap-4 text-center bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-900/70 border-0 justify-start overflow-hidden'
      backgroundConfig={{ scale: 0.3, strokeWidth: 1.1 }}
    >
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float' />
        <div
          className='absolute bottom-1/4 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <section
        className='min-h-dvh flex flex-col justify-center items-center p-6 pt-20 lg:aspect-video rounded-md md:p-16 md:pt-20 relative z-10'
        aria-labelledby='hero-title'
        aria-describedby='hero-description'
      >
        <div
          className='inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm hover:bg-green-500/20 transition-all duration-300 animate-fade-in-down opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500' />
          </span>
          <BodySmall className='text-green-400 font-medium'>{sections.hero.availability}</BodySmall>
        </div>

        <header
          className='z-10 mb-8 flex flex-col justify-center items-center animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <Display id='hero-title' className='flex flex-col mb-6 max-w-5xl'>
            <span className='animate-fade-in-up opacity-0' style={{ animationFillMode: 'both' }}>
              {sections.hero.title.firstLine}
            </span>{' '}
            <span
              className='bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-fade-in-up opacity-0'
              style={{ animationDelay: animations.loadDelay.first, animationFillMode: 'both' }}
            >
              {sections.hero.title.secondLine}
            </span>
          </Display>
          <BodyLarge
            id='hero-description'
            className='mb-8 max-w-2xl animate-fade-in-up opacity-0'
            style={{ animationDelay: animations.loadDelay.second, animationFillMode: 'both' }}
          >
            {sections.hero.description}
          </BodyLarge>
        </header>

        <div
          className={clsx(
            'flex flex-col sm:flex-row mb-16 z-10 animate-fade-in-up opacity-0',
            gapSpacing.sm
          )}
          style={{ animationDelay: animations.loadDelay.third, animationFillMode: 'both' }}
        >
          <Link href='#portfolio' passHref>
            <Button
              svg={<MoveDown strokeWidth={1.5} size={iconSizes.md} aria-hidden='true' />}
              label='View my work'
              size='xl'
              variant='primary'
              data-umami-event='hero_cta_click'
              aria-describedby='hero-description'
              className='min-w-[200px] font-semibold shadow-glow-md hover:shadow-glow-lg'
            />
          </Link>
          <Link href='#contact' passHref>
            <Button
              svg={<Mail strokeWidth={1.5} size={iconSizes.md} aria-hidden='true' />}
              label='Get in Touch'
              size='xl'
              variant='secondary'
              data-umami-event='hero_contact_click'
              className='min-w-[200px]'
            />
          </Link>
        </div>

        {/* Stats */}
        <div
          className={clsx(
            'grid grid-cols-3 max-w-2xl mx-auto pt-8 border-t border-zinc-800/50 backdrop-blur-sm animate-fade-in-up opacity-0',
            gapSpacing.sm,
            'md:gap-8'
          )}
          style={{ animationDelay: animations.loadDelay.fourth, animationFillMode: 'both' }}
        >
          {stats.map(stat => (
            <div
              key={stat.label}
              className='flex flex-col items-center group hover:scale-110 transition-transform duration-300'
            >
              <div className='text-2xl md:text-3xl font-bold text-zinc-50 mb-1 flex items-center gap-1'>
                {stat.value}
                {stat.label === 'Years Experience' && (
                  <Sparkles
                    size={iconSizes.md}
                    className='text-yellow-500 group-hover:animate-spin'
                    aria-hidden='true'
                  />
                )}
              </div>
              <BodySmall className='md:text-base text-zinc-200 font-light group-hover:text-zinc-100 transition-colors'>
                {stat.label}
              </BodySmall>
            </div>
          ))}
        </div>
      </section>
    </BoxWithBackground>
  );
};

export default Hero;
