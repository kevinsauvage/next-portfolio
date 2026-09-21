import Reveal from '@/components/shared/Reveal';
import Section from '@/components/ui/Section';
import { Body, H2, H3, Overline } from '@/components/ui/Typography';
import { passions, sections } from '@/config/content';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import PassionCard from './PassionCard';

import { ExternalLink } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <Section id='about'>
      <div className='space-y-24'>
        <div className='space-y-8'>
          <Reveal>
            <Overline>{sections.about.overline}</Overline>
          </Reveal>
          <Reveal>
            <H2 className='text-4xl md:text-5xl lg:text-6xl'>{sections.about.title}</H2>
          </Reveal>
          <Reveal
            as='p'
            delay={150}
            className='inline-flex flex-wrap items-center gap-2.5 rounded-full border border-primary-800/60 bg-primary-950/40 px-4 py-1.5 font-mono text-xs font-medium tracking-wide text-primary-300'
            aria-label={`Current role: ${sections.about.currently}`}
          >
            <span className='relative flex h-2 w-2' aria-hidden='true'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75' />
              <span className='relative inline-flex rounded-full h-2 w-2 bg-primary-400' />
            </span>
            {sections.about.currently}
          </Reveal>
          <Reveal delay={300}>
            <Body className='max-w-4xl'>{sections.about.description}</Body>
          </Reveal>
          <Reveal className='space-y-3' delay={450}>
            <p className='font-mono text-xs font-medium uppercase tracking-[0.18em] text-zinc-400'>
              {sections.about.languagesTitle}
            </p>
            <ul className='flex flex-wrap gap-2'>
              {sections.about.languages.map(lang => (
                <li
                  key={lang.language}
                  className='inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm'
                >
                  <span className='text-zinc-100'>{lang.language}</span>
                  {'credentialUrl' in lang && lang.credentialUrl ? (
                    <a
                      href={lang.credentialUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      data-umami-event={UMAMI_EVENTS.OUTBOUND_LINK_CLICK}
                      data-umami-event-url={lang.credentialUrl}
                      data-umami-event-location='about'
                      className='inline-flex items-center gap-1 font-mono text-xs text-primary-300 transition-colors hover:text-primary-200'
                    >
                      {lang.level}
                      <ExternalLink size={12} aria-hidden='true' />
                    </a>
                  ) : (
                    <span className='font-mono text-xs text-zinc-400'>{lang.level}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className='space-y-8'>
          <Reveal>
            <H3>My Philosophy</H3>
          </Reveal>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
