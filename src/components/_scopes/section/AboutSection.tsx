import Image, { StaticImageData } from 'next/image';

import Grid1 from '@/assets/grid1.png';
import Grid2 from '@/assets/grid2.png';
import Grid3 from '@/assets/grid3.png';
import Grid4 from '@/assets/grid4.png';
import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './Section';
import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionTitle from './SectionTitle';

import clsx from 'clsx';

const items = [
  {
    content:
      "Hey there! 👋 I'm Kévin Sauvage, a Frontend Developer who's passionate about crafting web experiences that users love.",
    image: {
      alt: 'About me',
      height: 204,
      src: Grid1,
      width: 247,
    },
    style: 'col-span-1 order-1 md:row-span-1 xl:row-span-3',
    title: 'Hi, I’m Kévin Sauvage',
  },

  {
    content:
      'I work mainly with JavaScript and TypeScript to build web applications, using React.js, Next.js, and Svelte.js as my go-to frameworks. For testing, I use Jest, Testing Library and Cypress to make sure everything works as intended. I have some experience with backend tech like Express.js, MongoDB, and Prisma ORM.',
    image: {
      alt: 'About me',
      height: 246,
      src: Grid2,
      width: 247,
    },
    style: 'md:order-3 md:col-span-2 md:row-span-1 xl:col-span-2 xl:row-span-3',
    title: 'Tech Stack',
  },

  {
    content:
      'What gets me excited about coding is making things that help people. I enjoy turning complex problems into simple solutions that users can easily understand and use. At Decathlon, this means working on things like making the checkout process smoother or ensuring our website works well across different countries.',
    image: {
      alt: 'About me',
      height: 435,
      src: Grid3,
      width: 1080,
    },
    style: 'md:order-4 md:row-span-1 md:col-span-2 xl:col-span-2 xl:row-span-3',
    title: 'My Passion for Coding',
  },

  {
    content: 'kevinsauvage@outlook.com',
    image: {
      alt: 'About me',
      height: 500,
      src: Grid4,
      width: 720,
    },
    style: 'md:order-2 md:row-span-1 md:col-span-1 xl:order-4 xl:row-span-3',
    title: 'Contact me at',
  },
];

const AboutItem: React.FC<{
  title: string;
  content: string;
  image: { src: StaticImageData; alt: string; width: number; height: number };
  index: number;
  style: string;
}> = ({ title, content, image, index, style }) => {
  return (
    <BoxWithBackground
      className={style}
      backgroundConfig={{
        scale: 0.2,
        strokeWidth: 1,
      }}
    >
      <div className="h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-zinc-900/70 z-0" />
        <div className="h-full z-10 relative flex flex-col justify-end align-bottom">
          <div className="relative flex flex-col items-center justify-center h-full w-full p-6">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-auto h-full object-contain"
            />
          </div>
          <div className="p-6">
            <p
              className={clsx(
                index === items.length - 1
                  ? 'text-zinc-200 text-lg text-center font-normal mb-1'
                  : 'text-2xl font-heading text-zinc-100 mb-3',
              )}
            >
              {title}
            </p>
            <p
              className={clsx(
                'font-light',
                index === items.length - 1
                  ? 'text-zinc-100 text-xl text-center'
                  : 'text-zinc-200 text-lg',
              )}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </BoxWithBackground>
  );
};

const AboutSection: React.FC = () => {
  return (
    <Section id="about">
      <SectionHeader>
        <SectionTitle>About Me</SectionTitle>
        <SectionDescription>
          Get to know me a little better. Here are some things I enjoy and some of my values.
        </SectionDescription>
      </SectionHeader>
      <div className="grid items-stretch grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-rows-none xl:grid-cols-3 xl:grid-rows-6  gap-5">
        {items.map((item, index) => (
          <AboutItem key={index} {...item} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
