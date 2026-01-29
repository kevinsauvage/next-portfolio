import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import MeshGradient from '@/components/shared/MeshGradient';
import Button from '@/components/ui/Button';
import { Body, BodySmall, Display } from '@/components/ui/Typography';
import { sections } from '@/config/content';

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
        className={clsx(
          'h-dvh md:min-h-dvh flex flex-col justify-center items-center text-center rounded-md md:justify-center relative z-10',
          'px-6 pb-6 pt-[calc(1.5rem+5rem)]', // Normal padding (p-6 = 1.5rem/24px) + header height (5rem/80px) = 104px
          'md:px-16 md:pb-16 md:pt-[calc(4rem+5rem)]' // Normal padding (md:p-16 = 4rem/64px) + header height (5rem/80px) = 144px
        )}
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
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              {sections.hero.title.secondLine}
            </span>
          </Display>
          <Body
            id='hero-description'
            className='mb-8 max-w-2xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            {sections.hero.description}
          </Body>
        </header>

        <div
          className='flex flex-col sm:flex-row mb-10 z-10 animate-fade-in-up opacity-0 w-full sm:w-auto gap-6'
          style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
        >
          <Button
            asChild
            svg={<MoveDown strokeWidth={1.5} size={20} />}
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
            svg={<Mail strokeWidth={1.5} size={20} />}
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
            className='grid grid-cols-3 max-w-2xl mx-auto pt-8 border-t border-zinc-800/50 backdrop-blur-sm animate-fade-in-up opacity-0 gap-4 md:gap-8'
            style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
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
                      size={20}
                      className='text-yellow-500 group-hover:animate-spin'
                      aria-hidden='true'
                      tabIndex={-1}
                    />
                  )}
                </div>
                <BodySmall className='md:text-base font-light transition-colors group-hover:text-zinc-100'>
                  {stat.label}
                </BodySmall>
              </div>
            ))}
          </div>

          <div
            className='mt-8 animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
          >
            <ContactInfo size={22} eventPrefix='hero' className='justify-center' />
          </div>
        </div>
      </section>

      {/* Stats - Below the fold on mobile only */}
      <div className='block md:hidden relative z-10 px-6 pb-8'>
        <div
          className='grid grid-cols-3 max-w-2xl mx-auto pt-8 border-t border-zinc-800/50 backdrop-blur-sm animate-fade-in-up opacity-0 gap-4'
          style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
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
                    size={20}
                    className='text-yellow-500 group-hover:animate-spin'
                    aria-hidden='true'
                  />
                )}
              </div>
              <BodySmall className='font-light transition-colors text-center group-hover:text-zinc-100'>
                {stat.label}
              </BodySmall>
            </div>
          ))}
        </div>

        <div
          className='mt-8 animate-fade-in-up opacity-0'
          style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
        >
          <ContactInfo size={22} eventPrefix='hero' className='justify-center' />
        </div>
      </div>
    </div>
  );
};

export default Hero;
