import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

import BoxWithBackground from '../../BoxWithBackground';
import LanguagesGrid from '../../LanguagesGrid';

import { MoveUpRight } from 'lucide-react';

const Hero = () => {
  const t = useTranslations('home');

  return (
    <BoxWithBackground
      className="relative p-0 h-dvh gap-4 text-center bg-gradient-to-t from-zinc-950 to-zinc-900/70 border-0"
      backgroundConfig={{ scale: 0.3, strokeWidth: 1.1 }}
    >
      <LanguagesGrid />
      <div className="flex flex-col justify-center items-center p-6 lg:aspect-video rounded-md md:p-16">
        <div className="z-10 mb-2 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold font-heading flex flex-col mb-2 text-zinc-300  max-w-5xl sm:text-5xl sm:leading-snug md:text-6xl md:leading-snug xl:text-7xl leading-snug xl:leading-tight">
            {t('hero.title')}
          </h1>
          <div className="text-lg font-extralight mb-5 text-zinc-400 max-w-xl md:text-2xl">
            {t('hero.description')}
          </div>
        </div>

        <Link
          href={t('hero.href')}
          passHref
          className="w-fit flex rounded-md gap-2 items-center justify-center bg-indigo-800 border border-indigo-900 text-zinc-300 px-10 py-4 text-lg 
          font-semibold hover:bg-indigo-900 hover:border-indigo-900 hover:text-zinc-200 hover:shadow-[0_20px_50px_rgba(55,_48,_163,_0.7)]
          focus:bg-indigo-800 focus:border-indigo-800 focus:text-zinc-200 
          active:bg-indigo-800 active:border-indigo-800 active:text-zinc-200"
        >
          {t('hero.cta')}
          <MoveUpRight strokeWidth={1.5} size={20} aria-label={t('hero.cta')} />
        </Link>
      </div>
    </BoxWithBackground>
  );
};

export default Hero;
