import Link from 'next/link';

import Background from './Background';
import Button from './Button';

import { MoveUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-dvh py-32 max-h-dvh flex flex-col justify-center items-center gap-4 h-full text-center ">
      <Background />
      <h1 className="text-4xl font-bold font-heading flex flex-col mb-2 text-zinc-300  max-w-4xl md:text-8xl">
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
      <Link href="/#contact" passHref className="w-fit">
        <Button label="Hire me" svg={<MoveUpRight strokeWidth={1.5} size={20} />} />
      </Link>
    </div>
  );
};

export default Hero;
