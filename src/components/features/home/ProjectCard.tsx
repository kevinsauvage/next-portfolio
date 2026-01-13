import Link from 'next/link';

import Button from '@/components/ui/Button';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, H4 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { colors, iconSizes } from '@/design-system/tokens';

import clsx from 'clsx';
import { ExternalLink, Github } from 'lucide-react';

type ProjectType = {
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

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { title, description, technologies, images, websiteLink, githubLink } = project;

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
          {/* Image Section */}
          <div className='md:col-span-2 flex items-center justify-center'>
            <div className='relative w-full'>
              {/* Project Number Badge - Positioned on image */}
              <div className='absolute -top-2 -left-2 z-10'>
                <NumberBadge number={index + 1} />
              </div>
              <CardImage
                src={images.thumbnail.src}
                alt={images.thumbnail.alt}
                aspectRatio='wide'
                width={800}
                height={500}
                sizes='(max-width: 768px) 100vw, 40vw'
                unoptimized={true}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className='md:col-span-3 flex flex-col space-y-5'>
            {/* Title & Description */}
            <div className='space-y-3'>
              <H4
                id={`project-title-${index}`}
                className={clsx(
                  'transition-colors duration-300',
                  colors.brandColors.groupHover.primary400
                )}
              >
                {title}
              </H4>
              <BodySmall
                className={clsx(
                  'transition-colors leading-relaxed',
                  colors.text.secondary,
                  colors.text.groupHover.secondary
                )}
              >
                {description}
              </BodySmall>
            </div>

            {/* Tech Stack Tags */}
            <div className='flex flex-wrap gap-1.5'>
              {technologies.map(({ name }) => (
                <Tag key={name}>{name}</Tag>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-3 pt-2 mt-auto'>
              <Button
                asChild
                svg={<ExternalLink size={iconSizes.sm} aria-hidden='true' />}
                label={sections.portfolio.buttons.viewLive}
                size='sm'
                variant='primary'
                data-umami-event='project_live_click'
                data-umami-event-project={title}
                className='shadow-glow-sm hover:shadow-glow-md'
              >
                <Link href={websiteLink} target='_blank' rel='noopener noreferrer' />
              </Button>
              {githubLink.length > 0 && (
                <Button
                  asChild
                  svg={<Github size={iconSizes.sm} aria-hidden='true' />}
                  label={sections.portfolio.buttons.sourceCode}
                  size='sm'
                  variant='secondary'
                  data-umami-event='project_github_click'
                  data-umami-event-project={title}
                >
                  <Link href={githubLink[0] as string} target='_blank' rel='noopener noreferrer' />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
