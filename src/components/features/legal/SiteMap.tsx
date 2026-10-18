import Link from 'next/link';

import Section from '@/components/ui/Section';
import { Body, H1, H3, Overline } from '@/components/ui/Typography';
import { layout, privacy, projects, siteMap } from '@/config/content';

const LINK_CLASSES =
  'inline-flex min-h-11 items-center text-zinc-200 underline-offset-4 transition-colors hover:text-primary-300 hover:underline';

type SiteMapGroupProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

const SiteMapGroup = ({ id, title, children }: SiteMapGroupProps) => (
  <section aria-labelledby={`${id}-heading`} className='space-y-3'>
    <H3 as='h2' size='sm' id={`${id}-heading`}>
      {title}
    </H3>
    <ul className='list-disc pl-5 marker:text-primary-500'>{children}</ul>
  </section>
);

const SiteMap: React.FC = () => (
  <Section id='site-map' spacing='lg' reveal={false}>
    <div className='mx-auto w-full max-w-3xl'>
      <header className='space-y-6'>
        <Overline>{siteMap.overline}</Overline>
        <H1>{siteMap.title}</H1>
        <Body className='text-zinc-300'>{siteMap.intro}</Body>
      </header>

      <nav aria-label={siteMap.title} className='mt-14 space-y-12'>
        <SiteMapGroup id='site-map-home' title={siteMap.groups.home}>
          {layout.header.navigation.items.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={LINK_CLASSES}>
                {label}
              </Link>
            </li>
          ))}
        </SiteMapGroup>

        <SiteMapGroup id='site-map-projects' title={siteMap.groups.projects}>
          {projects.map(({ slug, title }) => (
            <li key={slug}>
              <Link href={`/projects/${slug}`} className={LINK_CLASSES}>
                {title}
              </Link>
            </li>
          ))}
        </SiteMapGroup>

        <SiteMapGroup id='site-map-information' title={siteMap.groups.information}>
          <li>
            <Link href='/privacy' className={LINK_CLASSES}>
              {privacy.title}
            </Link>
          </li>
          <li>
            <Link href='/site-map' aria-current='page' className={LINK_CLASSES}>
              {siteMap.title}
            </Link>
          </li>
        </SiteMapGroup>
      </nav>
    </div>
  </Section>
);

export default SiteMap;
