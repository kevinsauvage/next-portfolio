import HeroStats from '@/components/features/home/HeroStats';
import GridBackground from '@/components/shared/GridBackground';
import MeshGradient from '@/components/shared/MeshGradient';
import ButtonLink from '@/components/ui/Button/ButtonLink';
import { Body, Display } from '@/components/ui/Typography';
import { GRADIENT_TEXT } from '@/components/ui/Typography/typography';
import { layout, sections } from '@/config/content';
import { ANALYTICS_EVENTS } from '@/lib/analytics/events';

import clsx from 'clsx';
import { FileText, MoveDown } from 'lucide-react';

const Hero = () => {
  return (
    <div className='relative rounded-none border-0 border-t border-zinc-700'>
      <MeshGradient overlayOpacity={75} />
      <GridBackground />

      {/* Hero Content - Full viewport on mobile */}
      <section
        id='home'
        className={clsx(
          'min-h-dvh flex flex-col justify-center items-center text-center rounded-md relative z-10',
          'px-6 pb-6 pt-[calc(1.5rem+5rem)]', // Normal padding (p-6 = 1.5rem/24px) + header height (5rem/80px) = 104px
          'md:px-16 md:pb-16 md:pt-[calc(4rem+5rem)]' // Normal padding (md:p-16 = 4rem/64px) + header height (5rem/80px) = 144px
        )}
        aria-labelledby='hero-title'
        aria-describedby='hero-description'
      >
        {/* Above the fold: uses the CSS `card-enter` animation rather than <Reveal>.
            The reveal starts at `opacity: 0` and waits for hydration before the
            observer un-hides it, which made the hero H1 — the LCP element — paint
            only after the 0.7s transition. A CSS animation starts at first paint. */}
        <header className='card-enter z-10 mb-8 flex flex-col justify-center items-center'>
          <p className='mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary-800/60 bg-primary-950/40 px-4 py-1.5 font-mono text-xs font-medium tracking-[0.18em] uppercase text-primary-300'>
            <span className='relative flex h-2 w-2' aria-hidden='true'>
              <span className='animate-ping [animation-iteration-count:5] absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75' />
              <span className='relative inline-flex rounded-full h-2 w-2 bg-primary-400' />
            </span>
            <span className='sr-only'>Availability: </span>
            {sections.hero.availability}
          </p>
          <Display id='hero-title' className='mb-6 max-w-5xl text-center md:flex md:flex-col'>
            <span>{sections.hero.title.firstLine}</span>{' '}
            <span className={clsx(GRADIENT_TEXT, 'bg-[length:200%_auto]')}>
              {sections.hero.title.secondLine}
            </span>
          </Display>
          <Body id='hero-description' className='mb-8 max-w-2xl'>
            {sections.hero.description}
          </Body>
        </header>

        <div
          className='card-enter flex flex-col sm:flex-row mb-10 z-10 w-full sm:w-auto gap-6'
          style={{ animationDelay: '600ms' }}
        >
          <ButtonLink
            href='/#career'
            svg={<MoveDown strokeWidth={1.5} size={20} />}
            label={sections.hero.primaryCta}
            size='xl'
            variant='primary'
            eventName={ANALYTICS_EVENTS.NAV_SECTION_CLICK}
            eventProperties={{ location: 'hero', section: 'Career' }}
            aria-describedby='hero-description'
            className='w-full sm:w-auto min-w-[220px] font-semibold shadow-glow-md hover:shadow-glow-lg'
          />
          <ButtonLink
            href={layout.header.resumeHref}
            target='_blank'
            rel='noopener noreferrer'
            prefetch={false}
            svg={<FileText strokeWidth={1.5} size={20} />}
            label={layout.header.ctaButton}
            size='xl'
            variant='secondary'
            eventName={ANALYTICS_EVENTS.CTA_RESUME_CLICK}
            eventProperties={{ location: 'hero' }}
            className='w-full sm:w-auto min-w-[220px]'
          />
        </div>

        <div className='hidden md:block w-full'>
          <HeroStats />
        </div>
      </section>

      {/* Stats — below the fold on mobile only */}
      <div className='block md:hidden relative z-10 px-6 pb-8'>
        <HeroStats />
      </div>
    </div>
  );
};

export default Hero;
