import Link from 'next/link';

import Button from '@/components/ui/Button';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import Section, { SectionHeader } from '@/components/ui/Section';
import projects from '@/config/content/projects';
import { stackSpacing } from '@/design-system/tokens';

import { ExternalLink, Github } from 'lucide-react';

type ProjectType = {
  title: string;
  description: string;
  images: { thumbnail: { src: string; alt: string } };
  technologies: Array<{ name: string }>;
  websiteLink: string;
  githubLink: Array<string>;
};

const ProjectCard: React.FC<{
  project: ProjectType;
  index: number;
}> = ({ project, index }) => {
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
                <span className='text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20'>
                  Project {String(index + 1).padStart(2, '0')}
                </span>
                <div className='h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent' />
              </div>
              <h3
                id={`project-title-${index}`}
                className='text-3xl font-bold text-zinc-100 group-hover:text-accent-400 transition-all duration-300'
              >
                {title}
              </h3>
              <p className='text-zinc-300 leading-relaxed text-lg group-hover:text-zinc-200 transition-colors font-light'>
                {description}
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {technologies.map(({ name }) => (
                <span
                  key={name}
                  className='px-3 py-1.5 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700 hover:border-blue-500/50 hover:bg-zinc-700/50 transition-all duration-300 cursor-default'
                >
                  {name}
                </span>
              ))}
            </div>

            <div className='flex flex-wrap gap-4'>
              <Link href={websiteLink} target='_blank' rel='noopener noreferrer'>
                <Button
                  svg={<ExternalLink size={18} aria-hidden='true' />}
                  label='View Live'
                  size='md'
                  variant='primary'
                  data-umami-event='project_live_click'
                  data-umami-event-project={title}
                  className='shadow-glow-sm hover:shadow-glow-md'
                />
              </Link>
              {githubLink.length > 0 && (
                <Link href={githubLink[0] as string} target='_blank' rel='noopener noreferrer'>
                  <Button
                    svg={<Github size={18} aria-hidden='true' />}
                    label='Source Code'
                    size='md'
                    variant='secondary'
                    data-umami-event='project_github_click'
                    data-umami-event-project={title}
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

const PortfolioSection: React.FC = () => {
  return (
    <Section id='portfolio'>
      <div className={stackSpacing['2xl']}>
        <div className='animate-fade-in-up opacity-0' style={{ animationFillMode: 'both' }}>
          <SectionHeader
            overline='Portfolio'
            title='Featured Projects'
            description='Translating modern web practices into tangible results. Each project is built with a focus on speed, accessibility, and creating meaningful user interactions.'
          />
        </div>

        <div className={stackSpacing.lg}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PortfolioSection;
