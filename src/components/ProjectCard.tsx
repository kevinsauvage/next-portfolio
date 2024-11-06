import Image from 'next/image';
import Link from 'next/link';

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
    <article
      className={`group relative hover:z-40 flex flex-col gap-20 p-6  h-full w-full md:flex-row md:transition-all md:p-10 grid-container ${className}`}
    >
      <div className="w-full flex flex-col justify-between items-start">
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
          className="flex items-center justify-center text-zinc-400 gap-2 whitespace-nowrap font-medium border border-zinc-600 rounded p-3"
          href={websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View project"
        >
          View project <MoveUpRight size={20} />
        </Link>
      </div>
      <div className="relative w-full flex items-center justify-center group">
        <Image
          className="w-full h-auto"
          src={images.thumbnail.src}
          alt={images.thumbnail.alt}
          width={1600}
          height={900}
        />
      </div>
    </article>
  );
};

export default ProjectCard;
