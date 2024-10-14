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

const Project = ({ item, className }: Properties) => {
  const { title, technologies, images, websiteLink } = item || {};

  return (
    <article className={`group relative hover:z-40 ${className}`}>
      <Link
        className="flex flex-col h-full w-full mb-10 md:flex-row lg:transition-all lg:border-t lg:border-b lg:py-8 lg:mb-0 lg:group-hover:border-blue-500"
        href={websiteLink}
        target="_blank"
        rel="noopener noreferrer"
        title={`Go to ${title}`}
        aria-label={`Open ${title} website in a new tab`}
      >
        <Image
          className="w-full md:w-80 lg:hidden lg:group-hover:block lg:absolute lg: lg:transition-all lg:right-36 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:duration-300 lg:w-98 lg:group-hover:opacity-100"
          src={images.thumbnail.src}
          alt={images.thumbnail.alt}
          width={1600}
          height={900}
        />
        <div className="p-2 w-full flex flex-col lg:flex-row lg:justify-between">
          <div className="">
            <h3 className="text-2xl mb-2">{title}</h3>
            <div className="flex flex-wrap gap-3 items-center text-blue-500 mb-5 lg:mb-0 lg:max-w-64">
              {technologies.map(({ name }) => (
                <div key={name} className="font-semibold whitespace-nowrap">
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 w-full whitespace-nowrap font-medium border border-blue-600 rounded p-3 mt-auto lg:border-none lg:mt-0 lg:p-0 lg:w-fit lg:group-hover:underline lg:group-hover:text-blue-500">
            View project <MoveUpRight size={20} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Project;
