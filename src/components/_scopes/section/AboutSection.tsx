import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
      <div className="h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-zinc-900/70 z-0" />
        <div className="h-full z-10 relative flex flex-col justify-end align-bottom">
          {image?.src && (
            <div className="relative flex flex-col items-center justify-center h-full w-full p-6">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-auto h-full object-contain"
              />
            </div>
          )}
          <div className="p-6">
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
  const t = useTranslations('home.about');
  const id = useTranslations('shared.header.nav');

  const itemsWithTraduction = ['first', 'second', 'third', 'fourth'].map((item, index) => ({
    description: t(`items.${item}.description`),
    image: items[index].image,
    style: items[index].style,
    title: t(`items.${item}.title`),
  }));

  return (
    <Section id={id('about')?.toLowerCase()}>
      <SectionHeader>
        <SectionTitle>{t('title')}</SectionTitle>
        <SectionDescription>{t('description')}</SectionDescription>
      </SectionHeader>
      <div
        className={clsx(
          'grid items-stretch grid-cols-1 gap-5',
          'md:grid-cols-2 md:grid-rows-3',
          'lg:grid-rows-none',
          'xl:grid-cols-3 xl:grid-rows-6',
        )}
      >
        {itemsWithTraduction.map((item, index) => (
          <AboutItem key={index} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
