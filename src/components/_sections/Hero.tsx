import Image from 'next/image';
import Link from 'next/link';

import testPng from '@/assets/images/bannerImage.svg';

import { LucideDownload, LucideSend } from 'lucide-react';

const Title: React.FC = () => {
  return (
    <h1 className="text-5xl font-bold flex flex-col mb-2 text-slate-50 font-serif sm:text-6xl lg:text-7xl xl:text-8xl">
      <span className="overflow-hidden whitespace-nowrap">Hello, I&apos;m</span>
      <span className="overflow-hidden whitespace-nowrap leading-tight">Kevin Sauvage</span>
    </h1>
  );
};

const Subtitle = () => (
  <div className="text-lg font-medium mb-5 will-change-auto  text-slate-200 max-w-md">
    I&apos;m a developer passionate about crafting exceptional websites. Currently, I&apos;m
    immersed in the exciting world of crafting accessible, human-centered products at{' '}
    <Link
      href="https://www.decathlon.fr/"
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Open Decathlon website in a new tab"
      className="text-blue-500 underline"
    >
      Decathlon
    </Link>
    .
  </div>
);

const HeroActions = () => (
  <div className="flex flex-wrap gap-4  will-change-auto">
    <Link
      href="/#contact"
      className="flex items-center justify-center gap-2 p-3 rounded font-semibold font-serif text-xl text-white border border-blue-900 hover:bg-blue-800 bg-gradient-to-r from-blue-600 to-violet-600 w-full sm:max-w-44"
      aria-label="Get in Touch - Scroll to the contact section"
    >
      Contact me
      <LucideSend size={20} />
    </Link>
    <Link
      href="/kevin-sauvage-cv.pdf"
      className="flex items-center justify-center w-full gap-2 p-3 font-semibold font-serif text-xl rounded border border-blue-700 text-blue-500 sm:max-w-44"
      aria-label="Download cv"
      target="_blank"
      prefetch={false}
      rel="noopener noreferrer"
      title=" Download cv"
      download
    >
      Download cv
      <LucideDownload size={20} />
    </Link>
  </div>
);

const HeroImage = () => (
  <div className="relative w-full h-full mb-6">
    <Image
      className="w-full m-auto lg:mb-11"
      src={testPng}
      width={500}
      height={500}
      alt="test"
      priority
    />
  </div>
);

const Hero = () => {
  return (
    <section className="py-28 min-h-dvh flex items-center">
      <div className="container m-auto flex flex-col-reverse items-center justify-between gap-4 lg:flex-row lg:gap-16">
        <div className="w-full px-3">
          <Title />
          <Subtitle />
          <HeroActions />
        </div>
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;
