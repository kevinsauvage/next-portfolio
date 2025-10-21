import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import Grid1 from '@/assets/grid1.png';
import Grid3 from '@/assets/grid3.png';
import Grid4 from '@/assets/grid4.png';
import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

import clsx from 'clsx';

const items = [
  {
    image: {
      alt: 'About me',
      height: 204,
      src: Grid1,
      width: 247,
    },
    style: 'order-1 col-span-1 order-1 md:row-span-1 xl:row-span-3',
  },
  {
    image: {
      alt: 'My Passion for Coding',
      height: 435,
      src: Grid3,
      width: 1080,
    },
    style: 'order-2 md:order-3 md:col-span-2 md:row-span-1 xl:col-span-2 xl:row-span-3',
  },
  {
    image: {
      alt: 'My Passion for Coding',
      height: 435,
      src: Grid3,
      width: 1080,
    },
    style: 'order-3 md:order-4 md:row-span-1 md:col-span-2 xl:col-span-2 xl:row-span-3',
  },
  {
    image: {
      alt: 'Contact me',
      height: 500,
      src: Grid4,
      width: 720,
    },
    style: 'order-4 md:order-2 md:row-span-1 md:col-span-1 xl:order-4 xl:row-span-3',
  },
];

const AboutItem: React.FC<{
  title: string;
  description: string;
  image?: { src: StaticImageData; alt: string; width: number; height: number };
  style: string;
}> = ({ title, description, image, style }) => {
  return (
    <BoxWithBackground className={style} backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}>
      <div className='h-full w-full'>
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 to-zinc-900/70 z-0' />
        <div className='h-full z-10 relative flex flex-col justify-end align-bottom'>
          {image?.src && (
            <div className='relative flex flex-col items-center justify-center h-full w-full p-6'>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className='w-auto h-full object-contain'
              />
            </div>
          )}
          <div className='p-6'>
            <h3 className={clsx('text-2xl font-heading font-semibold text-zinc-100 mb-3')}>
              {title}
            </h3>
            <div className={clsx('font-light text-zinc-200 text-lg')}>{description}</div>
          </div>
        </div>
      </div>
    </BoxWithBackground>
  );
};

const AboutSection: React.FC = () => {
  const itemsWithContent = [
    {
      title: "Hi, I'm Kévin Sauvage",
      description:
        "Hey there! 👋 I'm Kévin Sauvage, a Frontend Developer passionate about crafting web experiences that users love.",
      image: items[0].image,
      style: items[0].style,
    },
    {
      title: "I'm Passionate About Web Development",
      description:
        'What excites me most about coding is creating solutions that genuinely help people. I love transforming complex problems into intuitive, user-friendly experiences. At Decathlon, this translates into optimizing checkout processes and ensuring our website delivers a seamless experience across different countries and cultures.',
      image: items[1].image,
      style: items[1].style,
    },
    {
      title: 'I Love to Learn',
      description:
        "I'm constantly seeking opportunities to expand my skills and explore new technologies. I firmly believe that continuous learning is the key to professional growth and staying relevant in this ever-evolving field.",
      image: items[2].image,
      style: items[2].style,
    },
    {
      title: 'I Value Collaboration',
      description:
        'I believe the most impactful work emerges when people unite to share ideas and expertise. I actively seek collaborative opportunities and thrive in environments where knowledge sharing and teamwork drive innovation.',
      image: items[3].image,
      style: items[3].style,
    },
  ];

  return (
    <Section id='about'>
      <SectionHeader>
        <SectionTitle>About Me</SectionTitle>
        <SectionDescription>
          Get to know me a little better. Here are some things I enjoy and some of my values.
        </SectionDescription>
      </SectionHeader>
      <div
        className={clsx(
          'grid items-stretch grid-cols-1 gap-5',
          'md:grid-cols-2 md:grid-rows-3',
          'lg:grid-rows-none',
          'xl:grid-cols-3 xl:grid-rows-6'
        )}
      >
        {itemsWithContent.map((item, index) => (
          <AboutItem key={index} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
