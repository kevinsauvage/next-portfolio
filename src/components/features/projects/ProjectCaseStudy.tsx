import Link from 'next/link';

import { GitHubIcon } from '@/components/shared/BrandIcons';
import GridBackground from '@/components/shared/GridBackground';
import MeshGradient from '@/components/shared/MeshGradient';
import ButtonLink from '@/components/ui/Button/ButtonLink';
import { Card, CardContent, CardIcon, CardImage } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import Section from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { Body, BodySmall, Caption, H1, H2, H3, Overline } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import type { Project, ProjectFeature } from '@/config/content/projects';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import { ArrowLeft, Check, Code2, ExternalLink, ShieldCheck } from 'lucide-react';

type ProjectCaseStudyProps = {
  project: Project;
};

const FactGrid = ({ facts }: { facts: { label: string; value: string }[] }) => (
  <div className='grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-800/80 md:grid-cols-4'>
    {facts.map(fact => (
      <div
        key={fact.label}
        className='flex flex-col items-center justify-center bg-zinc-950/80 px-4 py-6 text-center'
      >
        <span className='font-mono text-2xl font-bold text-zinc-50 md:text-3xl'>{fact.value}</span>
        <BodySmall className='mt-1 text-xs uppercase tracking-[0.14em] text-zinc-400'>
          {fact.label}
        </BodySmall>
      </div>
    ))}
  </div>
);

const FeatureGrid = ({ features }: { features: ProjectFeature[] }) => (
  <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
    {features.map((feature, index) => (
      <Card key={feature.title} hover='subtle' size='md' className='group h-full'>
        <CardContent spacing='md' className='h-full'>
          <div className='flex items-start justify-between gap-4'>
            <H3 size='sm' className='transition-colors group-hover:text-primary-400'>
              {feature.title}
            </H3>
            <NumberBadge number={index + 1} className='shrink-0' />
          </div>
          <BodySmall className='text-zinc-300'>{feature.description}</BodySmall>
        </CardContent>
      </Card>
    ))}
  </div>
);

const TechnicalGrid = ({ items }: { items: ProjectFeature[] }) => (
  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
    {items.map(item => (
      <Card
        key={item.title}
        hover='subtle'
        size='md'
        glow='primary-secondary'
        className='group h-full'
      >
        <CardContent spacing='md' className='h-full'>
          <CardIcon variant='blue'>
            <Code2
              size={20}
              strokeWidth={1.5}
              aria-hidden='true'
              className='text-secondary-400 transition-transform duration-300 group-hover:rotate-12'
            />
          </CardIcon>
          <H3 size='sm' className='transition-colors group-hover:text-primary-400'>
            {item.title}
          </H3>
          <BodySmall className='text-zinc-300'>{item.description}</BodySmall>
        </CardContent>
      </Card>
    ))}
  </div>
);

const CheckList = ({ items }: { items: string[] }) => (
  <ul className='grid gap-3 sm:grid-cols-2'>
    {items.map(item => (
      <li key={item} className='flex items-start gap-3'>
        <Check
          size={16}
          strokeWidth={2.5}
          className='mt-0.5 shrink-0 text-primary-400'
          aria-hidden='true'
        />
        <BodySmall className='text-zinc-200'>{item}</BodySmall>
      </li>
    ))}
  </ul>
);

const ProjectCaseStudy = ({ project }: ProjectCaseStudyProps) => {
  const { slug, title, technologies, websiteLink, githubLink, images, role, timeline, caseStudy } =
    project;

  if (!caseStudy) return null;

  const { tagline, overview, facts, features, technical, responsibilities, quality } = caseStudy;
  const meta = [role, timeline].filter(Boolean).join(' · ');
  const repoUrl = githubLink.at(0);

  return (
    <article className='h-full w-full'>
      {/* Hero */}
      <header className='relative border-b border-zinc-800/60'>
        <MeshGradient overlayOpacity={78} />
        <GridBackground />
        <div className='container relative z-10 m-auto max-w-5xl px-6 pb-16 pt-32 md:pb-24 md:pt-40'>
          <Link
            href='/#portfolio'
            className='mb-8 flex w-fit min-h-11 items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-primary-300'
          >
            <ArrowLeft size={16} aria-hidden='true' />
            Back to portfolio
          </Link>

          <Overline>{sections.portfolio.caseStudy.overline}</Overline>

          <H1 gradient className='mb-6 mt-4'>
            {title}
          </H1>

          <Body className='mb-6 max-w-3xl text-zinc-300'>{tagline}</Body>

          {meta && (
            <p className='mb-6 font-mono text-xs uppercase tracking-[0.18em] text-secondary-300'>
              {meta}
            </p>
          )}

          <div className='mb-8 flex flex-wrap gap-1.5'>
            {technologies.map(({ name }) => (
              <Tag key={name}>{name}</Tag>
            ))}
          </div>

          <div className='flex flex-col gap-4 sm:flex-row sm:flex-wrap'>
            <ButtonLink
              href={websiteLink}
              target='_blank'
              rel='noopener noreferrer'
              svg={<ExternalLink size={18} aria-hidden='true' />}
              label={sections.portfolio.buttons.viewLive}
              size='lg'
              variant='primary'
              eventName={UMAMI_EVENTS.PORTFOLIO_PROJECT_LINK_CLICK}
              eventProperties={{ link_type: 'live', project_slug: slug }}
              className='w-full sm:w-auto font-semibold shadow-glow-md hover:shadow-glow-lg'
            />
            {repoUrl && (
              <ButtonLink
                href={repoUrl}
                target='_blank'
                rel='noopener noreferrer'
                svg={<GitHubIcon size={18} />}
                label={sections.portfolio.buttons.sourceCode}
                size='lg'
                variant='secondary'
                eventName={UMAMI_EVENTS.PORTFOLIO_PROJECT_LINK_CLICK}
                eventProperties={{ link_type: 'github', project_slug: slug }}
                className='w-full sm:w-auto'
              />
            )}
          </div>
        </div>
      </header>

      {/* Screenshot */}
      <div className='container relative z-10 m-auto -mt-10 max-w-5xl px-6 md:-mt-16'>
        <CardImage
          src={images.thumbnail.src}
          alt={images.thumbnail.alt}
          aspectRatio='wide'
          width={1200}
          height={750}
          priority
          sizes='(max-width: 1024px) 100vw, 1024px'
        />
      </div>

      <div className='container m-auto max-w-5xl px-6'>
        <Section id='snapshot' spacing='sm'>
          <FactGrid facts={facts} />
        </Section>

        <Section id='overview'>
          <div className='space-y-10'>
            <div className='space-y-6'>
              <Overline>{sections.portfolio.caseStudy.overview}</Overline>
              <H2 gradient className='animate-gradient bg-[length:200%_auto]'>
                {sections.portfolio.caseStudy.overviewTitle}
              </H2>
              <div className='max-w-3xl space-y-4'>
                {overview.map(paragraph => (
                  <Body key={paragraph} className='text-zinc-300'>
                    {paragraph}
                  </Body>
                ))}
              </div>
            </div>

            <div className='space-y-4'>
              <H3>{sections.portfolio.caseStudy.responsibilities}</H3>
              <CheckList items={responsibilities} />
            </div>
          </div>
        </Section>

        <Section id='features'>
          <div className='space-y-10'>
            <div className='space-y-6'>
              <Overline>{sections.portfolio.caseStudy.featuresOverline}</Overline>
              <H2 gradient className='animate-gradient bg-[length:200%_auto]'>
                {sections.portfolio.caseStudy.featuresTitle}
              </H2>
            </div>
            <FeatureGrid features={features} />
          </div>
        </Section>

        <Section id='engineering'>
          <div className='space-y-10'>
            <div className='space-y-6'>
              <Overline>{sections.portfolio.caseStudy.engineeringOverline}</Overline>
              <H2 gradient className='animate-gradient bg-[length:200%_auto]'>
                {sections.portfolio.caseStudy.engineeringTitle}
              </H2>
            </div>
            <TechnicalGrid items={technical} />
          </div>
        </Section>

        <Section id='quality'>
          <div className='space-y-8'>
            <div className='space-y-6'>
              <Overline>{sections.portfolio.caseStudy.qualityOverline}</Overline>
              <H2 gradient className='animate-gradient bg-[length:200%_auto]'>
                {sections.portfolio.caseStudy.qualityTitle}
              </H2>
            </div>
            <Card hover='subtle' size='lg' glow='secondary-accent' className='group'>
              <CardContent spacing='lg'>
                <div className='flex items-center gap-3'>
                  <CardIcon variant='accent'>
                    <ShieldCheck
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden='true'
                      className='text-accent-400 transition-transform duration-300 group-hover:rotate-12'
                    />
                  </CardIcon>
                  <Caption className='text-zinc-300'>
                    {sections.portfolio.caseStudy.qualityCaption}
                  </Caption>
                </div>
                <CheckList items={quality} />
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id='case-study-cta' spacing='md' className='pb-24'>
          <div className='flex flex-col items-center gap-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 px-6 py-12 text-center'>
            <H2 gradient className='animate-gradient bg-[length:200%_auto] text-3xl md:text-4xl'>
              {sections.portfolio.caseStudy.ctaTitle}
            </H2>
            <Body className='max-w-2xl text-zinc-300'>
              {sections.portfolio.caseStudy.ctaDescription}
            </Body>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <ButtonLink
                href={websiteLink}
                target='_blank'
                rel='noopener noreferrer'
                svg={<ExternalLink size={18} aria-hidden='true' />}
                label={sections.portfolio.buttons.viewLive}
                size='lg'
                variant='primary'
                eventName={UMAMI_EVENTS.PORTFOLIO_PROJECT_LINK_CLICK}
                eventProperties={{ link_type: 'live', project_slug: slug }}
                className='w-full sm:w-auto font-semibold'
              />
              <ButtonLink
                href='/'
                svg={<ArrowLeft size={18} aria-hidden='true' />}
                label={sections.portfolio.caseStudy.backCta}
                size='lg'
                variant='secondary'
                eventName={UMAMI_EVENTS.NAV_SECTION_CLICK}
                eventProperties={{ location: 'case_study', section: 'Portfolio' }}
                className='w-full sm:w-auto'
              />
            </div>
          </div>
        </Section>
      </div>
    </article>
  );
};

export default ProjectCaseStudy;
