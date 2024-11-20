import Image from 'next/image';
import Link from 'next/link';

import BoxWithBackground from './BoxWithBackground';

import clsx from 'clsx';
import { MoveUpRight } from 'lucide-react';

type ProjectType = {
  title: string;
  description: string;
  images: { thumbnail: { src: string; alt: string } };
  technologies: Array<{ name: string }>;
  websiteLink: string;
  githubLink: Array<string>;
};

type Properties = { item: ProjectType } & React.HTMLAttributes<HTMLAnchorElement>;

const ProjectCard = ({ item, className }: Properties) => {
  const { title, technologies, images, websiteLink } = item || {};

  return (
    <BoxWithBackground>
      <article
        className={clsx(
          'group relative p-6 hover:z-40 flex flex-col-reverse gap-10 h-full w-full md:grid md:grid-cols-5 md:transition-all',
          'bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 to-zinc-900/70',
          className,
        )}
      >
        <div className="w-full flex flex-col justify-between items-start md:col-span-3">
          <div className="">
            <h3 className="text-2xl mb-4 text-zinc-300 font-heading">{title}</h3>
            <p className="text-lg text-zinc-200 font-light mb-6">{item.description}</p>
            <div className="flex flex-wrap gap-3 items-center text-zinc-400 mb-5 mb:mb-0">
              {technologies.map(({ name }) => (
                <div key={name} className="font-light whitespace-nowrap">
                  {name}
                </div>
              ))}
            </div>
          </div>
          <Link
            className="flex items-center justify-center text-zinc-400 gap-2 whitespace-nowrap font-medium border border-zinc-600 bg-zinc-950 rounded p-3"
            href={websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View project"
          >
            View project <MoveUpRight size={20} aria-label="View project" />
          </Link>
        </div>
        <div className="relative w-fit flex items-center justify-center group md:col-span-2">
          <Image
            className="w-full h-auto"
            src={images.thumbnail.src}
            alt={images.thumbnail.alt}
            width={1600}
            height={900}
          />
        </div>
      </article>
    </BoxWithBackground>
  );
};

export default ProjectCard;
