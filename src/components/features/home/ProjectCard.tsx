import Link from 'next/link';

import Button from '@/components/ui/Button';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import { Body, BodySmall, H3 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { colors } from '@/design-system/tokens';

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
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 h-full'>
          <div className='md:col-span-2 flex items-center justify-center'>
            <CardImage
              src={images.thumbnail.src}
              alt={images.thumbnail.alt}
              aspectRatio='wide'
              width={800}
              height={500}
              sizes='(max-width: 768px) 100vw, 40vw'
            />
          </div>

          <div className='md:col-span-3 flex flex-col justify-between space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <BodySmall
                  className={clsx(
                    colors.status.info,
                    'bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20'
                  )}
                >
                  Project {String(index + 1).padStart(2, '0')}
                </BodySmall>
                <div className='h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent' />
              </div>
              <H3 id={`project-title-${index}`} className={clsx('transition-all duration-300')}>
                {title}
              </H3>
              <Body className={clsx('transition-colors', colors.text.groupHover.secondary)}>
                {description}
              </Body>
            </div>

            <div className='flex flex-wrap gap-2'>
              {technologies.map(({ name }) => (
                <span
                  key={name}
                  className={clsx(
                    'px-3 py-1.5 bg-zinc-800/50 text-xs rounded-full border border-zinc-700 transition-all duration-300 cursor-default',
                    colors.text.tertiary,
                    'hover:border-blue-500/50 hover:bg-zinc-700/50'
                  )}
                >
                  {name}
                </span>
              ))}
            </div>

            <div className='flex flex-wrap gap-6'>
              <Link
                href={websiteLink}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block w-full sm:w-auto'
              >
                <Button
                  svg={<ExternalLink size={18} aria-hidden='true' />}
                  label={sections.portfolio.buttons.viewLive}
                  size='md'
                  variant='primary'
                  data-umami-event='project_live_click'
                  data-umami-event-project={title}
                  className='shadow-glow-sm hover:shadow-glow-md min-w-[180px] w-full sm:w-auto'
                />
              </Link>
              {githubLink.length > 0 && (
                <Link
                  href={githubLink[0] as string}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block w-full sm:w-auto'
                >
                  <Button
                    svg={<Github size={18} aria-hidden='true' />}
                    label={sections.portfolio.buttons.sourceCode}
                    size='md'
                    variant='secondary'
                    data-umami-event='project_github_click'
                    data-umami-event-project={title}
                    className='min-w-[180px] w-full sm:w-auto'
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
