import Image from 'next/image';
import Link from 'next/link';

import BoxWithBackground from '@/components/BoxWithBackground';
import Button from '@/components/Button';
import GlowEffect from '@/components/GlowEffect';
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
      className='group hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 animate-fade-in-up opacity-0'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
      style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
    >
      <article
        className='h-full w-full overflow-hidden relative'
        aria-labelledby={`project-title-${index}`}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0 group-hover:from-zinc-900 group-hover:via-zinc-900/90 transition-all duration-500' />
        <GlowEffect variant='blue-purple' intensity='medium' />
        <div className='relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 p-8'>
          {/* Image Section */}
          <div className='md:col-span-2 flex items-center justify-center'>
            <div className='relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-800 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg group-hover:shadow-glow-md'>
              <Image
                src={images.thumbnail.src}
                alt={images.thumbnail.alt}
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-500'
                sizes='(max-width: 768px) 100vw, 40vw'
              />
              {/* Overlay gradient on hover */}
              <div className='absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </div>

          {/* Content Section */}
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
                className='text-3xl font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300'
              >
                {title}
              </h3>
              <p className='text-zinc-300 leading-relaxed text-lg group-hover:text-zinc-200 transition-colors'>
                {description}
              </p>
            </div>

            {/* Technologies */}
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
      </article>
    </BoxWithBackground>
  );
};

const PortfolioSection: React.FC = () => {
  return (
    <Section id='portfolio'>
      <div className='space-y-20'>
        {/* Header Section */}
        <div
          className='space-y-6 animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>Portfolio</p>
          <h2 className='text-4xl md:text-6xl font-bold'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient'>
              Featured Projects
            </span>
          </h2>
          <p
            className='text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            Translating modern web practices into tangible results. Each project is built with a
            focus on speed, accessibility, and creating meaningful user interactions.
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
