import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import { Link } from '@/i18n/routing';

import BoxWithBackground from '../../BoxWithBackground';
import LanguagesGrid from '../../LanguagesGrid';

import { MoveDown } from 'lucide-react';

const Hero = () => {
  const t = useTranslations('home');

  return (
    <BoxWithBackground
      className='relative p-0 h-dvh gap-4 text-center bg-gradient-to-t from-zinc-950 to-zinc-900/70 border-0'
      backgroundConfig={{ scale: 0.3, strokeWidth: 1.1 }}
    >
      <LanguagesGrid />
      <section
        className='flex flex-col justify-center items-center p-6 lg:aspect-video rounded-md md:p-16'
        aria-labelledby='hero-title'
        aria-describedby='hero-description'
      >
        <header className='z-10 mb-2 flex flex-col justify-center items-center'>
          <h1
            id='hero-title'
            className='text-4xl font-bold font-heading flex flex-col mb-2 text-zinc-300 max-w-5xl sm:text-5xl sm:leading-snug md:text-6xl md:leading-snug xl:text-7xl leading-snug xl:leading-tight'
          >
            {t('hero.title')}
          </h1>
          <p
            id='hero-description'
            className='text-lg font-extralight mb-5 text-zinc-400 max-w-xl md:text-2xl'
          >
            {t('hero.description')}
          </p>
        </header>

        <Link href={t('hero.href')} passHref>
          <Button
            svg={<MoveDown strokeWidth={1.5} size={20} aria-hidden='true' />}
            label={t('hero.cta')}
            size='xl'
            data-umami-event='hero_cta_click'
            aria-describedby='hero-description'
          />
        </Link>
      </section>
    </BoxWithBackground>
  );
};

export default Hero;
