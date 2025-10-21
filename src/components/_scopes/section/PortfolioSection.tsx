import Image from 'next/image';
import Link from 'next/link';

import BoxWithBackground from '@/components/BoxWithBackground';
import Button from '@/components/Button';
import projects from '@/config/projects.config';

import Section from './_components/Section';

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
    <BoxWithBackground
      className='group hover:-translate-y-1 transition-all duration-300'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
    >
      <article className='h-full w-full overflow-hidden' aria-labelledby={`project-title-${index}`}>
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0' />
        <div className='relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 p-8'>
          {/* Image Section */}
          <div className='md:col-span-2 flex items-center justify-center'>
            <div className='relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-800 group-hover:border-blue-500/50 transition-colors'>
              <Image
                src={images.thumbnail.src}
                alt={images.thumbnail.alt}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300'
                sizes='(max-width: 768px) 100vw, 40vw'
              />
            </div>
          </div>

          {/* Content Section */}
          <div className='md:col-span-3 flex flex-col justify-between space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <span className='text-sm font-medium text-blue-400'>
                  Project {String(index + 1).padStart(2, '0')}
                </span>
                <div className='h-px flex-1 bg-zinc-800' />
              </div>
              <h3
                id={`project-title-${index}`}
                className='text-3xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors'
              >
                {title}
              </h3>
              <p className='text-zinc-300 leading-relaxed text-lg'>{description}</p>
            </div>

            {/* Technologies */}
            <div className='flex flex-wrap gap-2'>
              {technologies.map(({ name }) => (
                <span
                  key={name}
                  className='px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700 hover:border-blue-500/50 transition-colors'
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-4'>
              <Link href={websiteLink} target='_blank' rel='noopener noreferrer'>
                <Button
                  svg={<ExternalLink size={18} aria-hidden='true' />}
                  label='View Live'
                  size='md'
                  variant='primary'
                  data-umami-event='project_live_click'
                  data-umami-event-project={title}
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
      </article>
    </BoxWithBackground>
  );
};

const PortfolioSection: React.FC = () => {
  return (
    <Section id='portfolio'>
      <div className='space-y-20'>
        {/* Header Section */}
        <div className='space-y-6'>
          <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>Portfolio</p>
          <h2 className='text-4xl md:text-6xl font-bold'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
              Featured Projects
            </span>
          </h2>
          <p className='text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl'>
            Explore my latest work showcasing modern web development practices, performance
            optimization, and user-centered design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className='space-y-10'>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PortfolioSection;
