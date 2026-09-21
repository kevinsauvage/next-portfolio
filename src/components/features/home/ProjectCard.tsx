import { GitHubIcon } from '@/components/shared/BrandIcons';
import ButtonLink from '@/components/ui/Button/ButtonLink';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, H3 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import type { Project } from '@/config/content/projects';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import { BookOpen, Check, ExternalLink } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectImage = ({
  images,
  index,
}: {
  images: { thumbnail: { src: string; alt: string } };
  index: number;
}) => {
  return (
    <div className='relative w-full'>
      <div className='absolute -left-2 -top-2 z-10'>
        <NumberBadge number={index + 1} />
      </div>
      <CardImage
        src={images.thumbnail.src}
        alt={images.thumbnail.alt}
        aspectRatio='wide'
        width={1200}
        height={750}
        sizes='(max-width: 1024px) 100vw, 1024px'
      />
    </div>
  );
};

const ProjectTitleAndDescription = ({
  title,
  description,
  meta,
  index,
}: {
  title: string;
  description: string;
  meta?: string;
  index: number;
}) => {
  return (
    <div className='space-y-3'>
      {meta && (
        <p className='font-mono text-xs uppercase tracking-[0.18em] text-secondary-300'>{meta}</p>
      )}
      <H3
        id={`project-title-${index}`}
        size='sm'
        className='transition-colors duration-300 group-hover:text-primary-400'
      >
        {title}
      </H3>
      <BodySmall className='max-w-3xl transition-colors leading-relaxed text-zinc-200 group-hover:text-zinc-200'>
        {description}
      </BodySmall>
    </div>
  );
};

const ProjectHighlights = ({ highlights }: { highlights: string[] }) => {
  return (
    <ul className='grid gap-2 sm:grid-cols-2'>
      {highlights.map(highlight => (
        <li key={highlight} className='flex items-start gap-2'>
          <Check
            size={15}
            strokeWidth={2}
            className='mt-0.5 shrink-0 text-primary-400'
            aria-hidden='true'
          />
          <BodySmall className='text-zinc-300'>{highlight}</BodySmall>
        </li>
      ))}
    </ul>
  );
};

const TechStackTags = ({ technologies }: { technologies: Array<{ name: string }> }) => {
  return (
    <div className='flex flex-wrap gap-1.5'>
      {technologies.map(({ name }) => (
        <Tag key={name}>{name}</Tag>
      ))}
    </div>
  );
};

const ProjectActionButtons = ({
  slug,
  websiteLink,
  githubLink,
}: {
  slug: string;
  websiteLink: string;
  githubLink: Array<string>;
}) => {
  return (
    <div className='flex flex-wrap gap-3 pt-2 mt-auto'>
      <ButtonLink
        href={`/projects/${slug}`}
        svg={<BookOpen size={16} aria-hidden='true' />}
        label={sections.portfolio.buttons.caseStudy}
        size='sm'
        variant='primary'
        eventName={UMAMI_EVENTS.PORTFOLIO_PROJECT_LINK_CLICK}
        eventProperties={{ link_type: 'case_study', project_slug: slug }}
        className='shadow-glow-sm hover:shadow-glow-md'
      />
      <ButtonLink
        href={websiteLink}
        svg={<ExternalLink size={16} aria-hidden='true' />}
        label={sections.portfolio.buttons.viewLive}
        size='sm'
        variant='secondary'
        eventName={UMAMI_EVENTS.PORTFOLIO_PROJECT_LINK_CLICK}
        eventProperties={{ link_type: 'live', project_slug: slug }}
        target='_blank'
        rel='noopener noreferrer'
      />
      {githubLink.length > 0 && (
        <ButtonLink
          href={githubLink[0] as string}
          svg={<GitHubIcon size={16} />}
          label={sections.portfolio.buttons.sourceCode}
          size='sm'
          variant='secondary'
          eventName={UMAMI_EVENTS.PORTFOLIO_PROJECT_LINK_CLICK}
          eventProperties={{ link_type: 'github', project_slug: slug }}
          target='_blank'
          rel='noopener noreferrer'
        />
      )}
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { slug, title, description, technologies, images, websiteLink, githubLink } = project;
  const { role, timeline, highlights } = project;
  const meta = [role, timeline].filter(Boolean).join(' · ');

  return (
    <Card
      hover='standard'
      size='md'
      glow='primary-secondary'
      animationIndex={index}
      className='group relative h-full'
    >
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent'
      />
      <CardContent spacing='lg' className='relative z-10 h-full pt-6'>
        <div className='space-y-6'>
          <ProjectImage images={images} index={index} />
          <div className='flex flex-col space-y-5'>
            <ProjectTitleAndDescription
              title={title}
              description={description}
              index={index}
              {...(meta && { meta })}
            />
            {highlights && highlights.length > 0 && <ProjectHighlights highlights={highlights} />}
            <TechStackTags technologies={technologies} />
            <ProjectActionButtons slug={slug} websiteLink={websiteLink} githubLink={githubLink} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
