import NewTabHint from '@/components/ui/NewTabHint';
import Section from '@/components/ui/Section';
import { Body, BodySmall, Caption, H1, H3, Overline } from '@/components/ui/Typography';
import { accessibility, COMPLIANCE_LABELS, sections } from '@/config/content';
import type { AccessibilitySection } from '@/config/content/accessibility';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import { Mail } from 'lucide-react';

const mailto = `mailto:${sections.contact.email}`;

const LINK_CLASSES =
  'text-primary-300 underline underline-offset-4 transition-colors hover:text-primary-200';

const StatementSection = ({ section }: { section: AccessibilitySection }) => (
  <section
    id={section.id}
    aria-labelledby={`${section.id}-heading`}
    className='scroll-mt-28 space-y-4'
  >
    <H3 as='h2' size='sm' id={`${section.id}-heading`}>
      {section.title}
    </H3>

    {section.paragraphs?.map(paragraph => (
      <Body key={paragraph} className='text-zinc-300'>
        {paragraph}
      </Body>
    ))}

    {section.items && (
      <ul className='list-disc space-y-2 pl-5 marker:text-primary-500'>
        {section.items.map(item => (
          <li key={item}>
            <BodySmall className='text-zinc-300'>{item}</BodySmall>
          </li>
        ))}
      </ul>
    )}

    {section.links && (
      <ul className='space-y-2'>
        {section.links.map(({ label, href }) => (
          <li key={href}>
            <a href={href} target='_blank' rel='noopener noreferrer' className={LINK_CLASSES}>
              {label}
              <NewTabHint />
            </a>
          </li>
        ))}
      </ul>
    )}

    {section.contact && (
      <a
        href={mailto}
        data-analytics-event={ANALYTICS_EVENTS.OUTBOUND_LINK_CLICK}
        data-analytics-url={mailto}
        data-analytics-location='accessibility'
        className='inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-3 font-mono text-sm text-zinc-100 transition-colors hover:border-primary-600 hover:text-primary-300'
      >
        <Mail size={18} aria-hidden='true' />
        {sections.contact.email}
      </a>
    )}
  </section>
);

const AccessibilityStatement: React.FC = () => {
  const { status, complianceRate } = accessibility;

  return (
    <article className='h-full w-full'>
      <Section id='accessibility' spacing='lg' reveal={false}>
        <div className='mx-auto w-full max-w-3xl'>
          <header className='space-y-6'>
            <Overline>{accessibility.overline}</Overline>
            <H1>{accessibility.title}</H1>
            <dl className='rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6'>
              <dt className='font-mono text-xs font-medium uppercase tracking-[0.18em] text-zinc-400'>
                {accessibility.statusLabel}
              </dt>
              <dd className='mt-2 text-lg font-medium text-zinc-100 first-letter:uppercase'>
                {/* eslint-disable-next-line security/detect-object-injection -- typed union key */}
                {COMPLIANCE_LABELS[status]}
                {complianceRate !== null && ` — ${complianceRate}% of RGAA 4.1 criteria met`}
              </dd>
            </dl>
            <Caption className='block text-zinc-400'>
              {accessibility.establishedOnLabel}:{' '}
              <time dateTime={accessibility.establishedOn}>
                {accessibility.establishedOnDisplay}
              </time>
            </Caption>
          </header>

          <div className='mt-14 space-y-14'>
            {accessibility.sections.map(section => (
              <StatementSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </Section>
    </article>
  );
};

export default AccessibilityStatement;
