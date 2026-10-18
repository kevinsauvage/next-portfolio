import CookieSettingsButton from '@/components/shared/CookieSettingsButton';
import Section from '@/components/ui/Section';
import { Body, BodySmall, Caption, H1, H3, Overline } from '@/components/ui/Typography';
import { cookies, privacy, sections } from '@/config/content';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import { Mail } from 'lucide-react';

const mailto = `mailto:${sections.contact.email}`;

const EmailLink = () => (
  <a
    href={mailto}
    data-analytics-event={ANALYTICS_EVENTS.OUTBOUND_LINK_CLICK}
    data-analytics-url={mailto}
    data-analytics-location='privacy'
    className='inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-3 font-mono text-sm text-zinc-100 transition-colors hover:border-primary-600 hover:text-primary-300'
  >
    <Mail size={18} aria-hidden='true' />
    {sections.contact.email}
  </a>
);

/**
 * Built from `cookies.ts`, the same source the banner reads, so a new category
 * can never appear in the banner without showing up in the policy.
 */
const CookieCategoryTable = () => (
  <div
    role='region'
    aria-label={privacy.cookieTableCaption}
    tabIndex={0}
    className='overflow-x-auto rounded-xl border border-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300'
  >
    <table className='w-full border-collapse text-left'>
      <caption className='sr-only'>{privacy.cookieTableCaption}</caption>
      <thead>
        <tr className='bg-zinc-900/60'>
          <th scope='col' className='px-4 py-3 text-sm font-semibold text-zinc-100'>
            {privacy.cookieTableHeaders.category}
          </th>
          <th scope='col' className='px-4 py-3 text-sm font-semibold text-zinc-100'>
            {privacy.cookieTableHeaders.purpose}
          </th>
          <th scope='col' className='px-4 py-3 text-sm font-semibold text-zinc-100'>
            {privacy.cookieTableHeaders.status}
          </th>
        </tr>
      </thead>
      <tbody className='divide-y divide-zinc-800'>
        {cookies.preferences.categories.map(category => (
          <tr key={category.name}>
            <th scope='row' className='px-4 py-4 align-top text-sm font-medium text-zinc-100'>
              {category.title}
            </th>
            <td className='px-4 py-4 align-top'>
              <BodySmall className='text-zinc-300'>{category.description}</BodySmall>
            </td>
            <td className='px-4 py-4 align-top'>
              <BodySmall className='text-zinc-400'>
                {category.required
                  ? cookies.preferences.required
                  : privacy.cookieTableOptionalLabel}
              </BodySmall>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PrivacyPolicy: React.FC = () => {
  return (
    <article className='h-full w-full'>
      {/* `reveal={false}`: anchored sections must be in the DOM when the hash loads. */}
      <Section id='privacy' spacing='lg' reveal={false}>
        <div className='mx-auto w-full max-w-3xl'>
          <header className='space-y-6'>
            <Overline>{privacy.overline}</Overline>
            <H1>{privacy.title}</H1>
            <Body className='text-zinc-300'>{privacy.intro}</Body>
            <Caption className='block text-zinc-400'>
              {privacy.lastUpdatedLabel}:{' '}
              <time dateTime={privacy.lastUpdated}>{privacy.lastUpdatedDisplay}</time>
            </Caption>
          </header>

          <nav
            aria-label={privacy.contentsTitle}
            className='mt-12 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6'
          >
            <p className='mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-zinc-400'>
              {privacy.contentsTitle}
            </p>
            <ol className='grid gap-x-6 gap-y-2 sm:grid-cols-2'>
              {privacy.sections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className='text-sm text-zinc-300 underline-offset-4 transition-colors hover:text-primary-400 hover:underline'
                  >
                    {section.shortTitle}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className='mt-14 space-y-14'>
            {privacy.sections.map(section => (
              <section
                key={section.id}
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

                {section.lists?.map(list => (
                  <div key={list.items[0]} className='space-y-2'>
                    {list.intro && <BodySmall className='text-zinc-300'>{list.intro}</BodySmall>}
                    <ul className='list-disc space-y-2 pl-5 marker:text-primary-500'>
                      {list.items.map(item => (
                        <li key={item}>
                          <BodySmall className='text-zinc-300'>{item}</BodySmall>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.cookieTable && <CookieCategoryTable />}

                {section.contact && <EmailLink />}

                {section.cookieSettings && (
                  <BodySmall className='text-zinc-400'>
                    {privacy.cookieSettingsLead} <CookieSettingsButton />.
                  </BodySmall>
                )}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </article>
  );
};

export default PrivacyPolicy;
