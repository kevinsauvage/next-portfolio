import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import MeshGradient from '@/components/shared/MeshGradient';
import Button from '@/components/ui/Button';
import { Body, BodySmall, Display } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { animations, colors, gapSpacing, iconSizes } from '@/design-system/tokens';

import clsx from 'clsx';
import { Mail, MoveDown, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Products Scaled', value: '5+' },
  { label: 'Pull Requests Merged', value: '400+' },
  { label: 'Users Impacted', value: '1M+' },
];

const Hero = () => {
  return (
    <div className='relative rounded-none border-0 border-t border-zinc-700'>
      <MeshGradient overlayOpacity={75} />

      {/* Hero Content - Full viewport on mobile */}
      <section
        id='home'
        className='h-dvh md:min-h-dvh flex flex-col justify-center items-center p-6 pt-20 text-center rounded-md md:p-16 md:pt-20 md:justify-end relative z-10'
        aria-labelledby='hero-title'
        aria-describedby='hero-description'
      >
        <header
          className='z-10 mb-8 flex flex-col justify-center items-center animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <Display id='hero-title' className='mb-6 max-w-5xl text-center md:flex md:flex-col'>
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
          <Body
            id='hero-description'
            className='mb-8 max-w-2xl animate-fade-in-up opacity-0'
            style={{ animationDelay: animations.loadDelay.second, animationFillMode: 'both' }}
          >
            {sections.hero.description}
          </Body>
        </header>

        <div
          className={clsx(
            'flex flex-col sm:flex-row mb-10 z-10 animate-fade-in-up opacity-0 w-full sm:w-auto',
            gapSpacing.md
          )}
          style={{ animationDelay: animations.loadDelay.third, animationFillMode: 'both' }}
        >
          <Button
            asChild
            svg={<MoveDown strokeWidth={1.5} size={iconSizes.md} />}
            label='View my work'
            size='xl'
            variant='primary'
            data-umami-event='hero_cta_click'
            aria-describedby='hero-description'
            className='w-full sm:w-auto min-w-[220px] font-semibold shadow-glow-md hover:shadow-glow-lg'
          >
            <Link href='#portfolio' />
          </Button>
          <Button
            asChild
            svg={<Mail strokeWidth={1.5} size={iconSizes.md} />}
            label='Get in Touch'
            size='xl'
            variant='secondary'
            data-umami-event='hero_contact_click'
            className='w-full sm:w-auto min-w-[220px]'
          >
            <Link href='#contact' />
          </Button>
        </div>

        {/* Stats - Visible on desktop only, part of first fold */}
        <div className='hidden md:block w-full'>
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
                <div className='text-2xl md:text-3xl font-bold mb-1 flex items-center gap-1 '>
                  {stat.value}
                  {stat.label === 'Years Experience' && (
                    <Sparkles
                      size={iconSizes.md}
                      className={clsx(colors.brandColors.yellow, 'group-hover:animate-spin')}
                      aria-hidden='true'
                      tabIndex={-1}
                    />
                  )}
                </div>
                <BodySmall
                  className={clsx(
                    'md:text-base font-light transition-colors',
                    colors.text.groupHover.light
                  )}
                >
                  {stat.label}
                </BodySmall>
              </div>
            ))}
          </div>

          <div
            className='mt-8 animate-fade-in-up opacity-0'
            style={{ animationDelay: animations.loadDelay.fourth, animationFillMode: 'both' }}
          >
            <ContactInfo size={22} eventPrefix='hero' className='justify-center' />
          </div>
        </div>
      </section>

      {/* Stats - Below the fold on mobile only */}
      <div className='block md:hidden relative z-10 px-6 pb-8'>
        <div
          className={clsx(
            'grid grid-cols-3 max-w-2xl mx-auto pt-8 border-t border-zinc-800/50 backdrop-blur-sm animate-fade-in-up opacity-0',
            gapSpacing.sm
          )}
          style={{ animationDelay: animations.loadDelay.fourth, animationFillMode: 'both' }}
        >
          {stats.map(stat => (
            <div
              key={stat.label}
              className='flex flex-col items-center group hover:scale-110 transition-transform duration-300'
            >
              <div className='text-2xl font-bold mb-1 flex items-center gap-1'>
                {stat.value}
                {stat.label === 'Years Experience' && (
                  <Sparkles
                    size={iconSizes.md}
                    className={clsx(colors.brandColors.yellow, 'group-hover:animate-spin')}
                    aria-hidden='true'
                  />
                )}
              </div>
              <BodySmall
                className={clsx(
                  'font-light transition-colors text-center',
                  colors.text.groupHover.light
                )}
              >
                {stat.label}
              </BodySmall>
            </div>
          ))}
        </div>

        <div
          className='mt-8 animate-fade-in-up opacity-0'
          style={{ animationDelay: animations.loadDelay.fourth, animationFillMode: 'both' }}
        >
          <ContactInfo size={22} eventPrefix='hero' className='justify-center' />
        </div>
      </div>
    </div>
  );
};

export default Hero;
