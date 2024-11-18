import Link from 'next/link';

import BoxWithBackground from './BoxWithBackground';
import Button from './Button';
import LanguagesGrid from './LanguagesGrid';

import { MoveUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <BoxWithBackground className="relative p-0 h-[calc(100vh-64px-32px-16px-16px)] m-auto mt-[calc(64px+32px)] max-h-dvh  gap-4 text-center">
      <LanguagesGrid />
      <div className="flex flex-col justify-center items-center bg-black p-6 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-zinc-800 md:p-10">
        <div className="z-10 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold font-heading flex flex-col mb-2 text-zinc-300  max-w-4xl sm:text-6xl md:text-6xl xl:text-7xl">
            Hello, welcome to my Portfolio.
          </h1>
          <div className="text-lg font-light mb-5 text-zinc-400 max-w-xl md:text-2xl">
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
        </div>

        <Link href="/#contact" passHref className="w-fit">
          <Button label="Hire me" svg={<MoveUpRight strokeWidth={1.5} size={20} />} />
        </Link>
      </div>
    </BoxWithBackground>
  );
};

export default Hero;