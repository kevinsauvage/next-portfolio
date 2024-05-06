import Image from 'next/image';
import Link from 'next/link';

import testPng from '@/assets/images/bannerImage.svg';
import AnimatedContainer from '@/components/AnimatedContainer';
import renderLetters from '@/utils/renderLetters';

import { LucideDownload, LucideSend } from 'lucide-react';

const elasticOut = 'elastic.out(1, 0.6)';

const Title: React.FC = () => {
  return (
    <AnimatedContainer
      Tag="h1"
      className="text-5xl font-bold flex flex-col mb-2 text-slate-50 font-serif sm:text-6xl lg:text-7xl xl:text-8xl"
      from={{ ease: 'sine.out', opacity: 0, y: 250 }}
      to={{
        duration: 0.5,
        ease: 'sine.out',
        opacity: 1,
        stagger: { amount: 0.5, each: 0.1 },
        y: 0,
      }}
      triggerClassName=".char"
    >
      <span className="overflow-hidden whitespace-nowrap">
        {renderLetters(
          "Hello, I'm",
          'bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent',
        )}
      </span>
      <span className="overflow-hidden whitespace-nowrap leading-tight">
        {renderLetters('Kevin Sauvage')}
      </span>
    </AnimatedContainer>
  );
};

const Subtitle = () => (
  <AnimatedContainer
    className="text-lg font-medium mb-5 will-change-auto opacity-0 text-slate-200 max-w-md"
    from={{ delay: 0.5, ease: elasticOut, opacity: 0, x: -100 }}
    to={{ delay: 0.5, duration: 1, ease: elasticOut, opacity: 1, x: 0 }}
  >
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
  </AnimatedContainer>
);

const HeroActions = () => (
  <AnimatedContainer
    className="flex flex-wrap gap-4 opacity-0 will-change-auto"
    from={{ delay: 0.6, ease: elasticOut, opacity: 0, x: -100 }}
    to={{ delay: 0.6, duration: 1, ease: elasticOut, opacity: 1, x: 0 }}
  >
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
  </AnimatedContainer>
);

const HeroImage = () => (
  <AnimatedContainer
    className="relative w-full h-full mb-6 will-change-auto opacity-0 "
    from={{ delay: 0.2, ease: 'power2.inOut', opacity: 0, scale: 0.3 }}
    to={{ delay: 0.6, duration: 0.3, ease: 'power2.inOut', opacity: 1, scale: 1 }}
  >
    <Image
      className="w-full m-auto lg:mb-11"
      src={testPng}
      width={500}
      height={500}
      alt="test"
      priority
    />
  </AnimatedContainer>
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
