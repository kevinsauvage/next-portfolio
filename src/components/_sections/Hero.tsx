import Link from 'next/link';

import { LucideDownload, LucideSend } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-28 min-h-dvh flex items-center">
      <div className="container m-auto flex flex-col items-center justify-between gap-4 lg:gap-6">
        <h1 className="text-4xl font-bold flex flex-col mb-2 text-slate-200 font-title max-w-4xl text-center md:text-8xl">
          Hello, welcome to My Portfolio.
        </h1>
        <div className="text-lg text-center font-normal mb-5 text-slate-400 max-w-lg md:text-2xl">
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
        <div className="flex gap-4">
          <Link
            href="/#contact"
            className="flex items-center whitespace-nowrap justify-center w-full gap-2 p-2 font-semibold font-serif text-lg text-white rounded border border-blue-700  bg-blue-600 hover:bg-blue-900"
            aria-label="Get in Touch - Scroll to the contact section"
          >
            Contact me
            <LucideSend size={20} />
          </Link>
          <Link
            href="/kevin-sauvage-cv.pdf"
            className="flex items-center whitespace-nowrap justify-center gap-2 p-2 rounded font-semibold font-serif text-lg text-white border border-violet-900 hover:bg-violet-900 bg-violet-600 w-full"
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
      </div>
    </section>
  );
};

export default Hero;
