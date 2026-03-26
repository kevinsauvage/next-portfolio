import ButtonLink from '@/components/ui/Button/ButtonLink';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, H3 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import { ExternalLink, Github } from 'lucide-react';

type ProjectType = {
  slug: string;
  title: string;
  description: string;
  images: { thumbnail: { src: string; alt: string } };
  technologies: Array<{ name: string }>;
  websiteLink: string;
  githubLink: Array<string>;
};

type ProjectCardProps = {
  project: ProjectType;
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
    <div className='md:col-span-2 flex items-center justify-center'>
      <div className='relative w-full'>
        <div className='absolute -top-2 -left-2 z-10'>
          <NumberBadge number={index + 1} />
        </div>
        <CardImage
          src={images.thumbnail.src}
          alt={images.thumbnail.alt}
          aspectRatio='wide'
          width={800}
          height={500}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw'
          priority={index < 3}
          unoptimized={true}
        />
      </div>
    </div>
  );
};

const ProjectTitleAndDescription = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div className='space-y-3'>
      <H3
        id={`project-title-${index}`}
        size='sm'
        className='transition-colors duration-300 group-hover:text-primary-400'
      >
        {title}
      </H3>
      <BodySmall className='transition-colors leading-relaxed text-zinc-200 group-hover:text-zinc-200'>
        {description}
      </BodySmall>
    </div>
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
        href={websiteLink}
        svg={<ExternalLink size={16} aria-hidden='true' />}
        label={sections.portfolio.buttons.viewLive}
        size='sm'
        variant='primary'
        eventName={UMAMI_EVENTS.PORTFOLIO_PROJECT_LINK_CLICK}
        eventProperties={{ link_type: 'live', project_slug: slug }}
        className='shadow-glow-sm hover:shadow-glow-md'
        target='_blank'
        rel='noopener noreferrer'
      />
      {githubLink.length > 0 && (
        <ButtonLink
          href={githubLink[0] as string}
          svg={<Github size={16} aria-hidden='true' />}
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

  return (
    <Card
      hover='standard'
      size='md'
      glow='primary-secondary'
      animationIndex={index}
      className='group relative h-full'
    >
      <CardContent spacing='lg' className='relative z-10 h-full'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 h-full'>
          <ProjectImage images={images} index={index} />
          <div className='md:col-span-3 flex flex-col space-y-5'>
            <ProjectTitleAndDescription title={title} description={description} index={index} />
            <TechStackTags technologies={technologies} />
            <ProjectActionButtons slug={slug} websiteLink={websiteLink} githubLink={githubLink} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
