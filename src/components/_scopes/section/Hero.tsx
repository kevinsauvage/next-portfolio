import Link from 'next/link';

import Button from '@/components/Button';

import BoxWithBackground from '../../BoxWithBackground';

import { Mail, MoveDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const stats = [
    { label: 'Products Scaled', value: '5+' },
    { label: 'Pull Requests Merged', value: '400+' },
    { label: 'Users Impacted', value: '1M+' },
  ];

  return (
    <BoxWithBackground
      className='relative p-0 gap-4 text-center bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-900/70 border-0 justify-start overflow-hidden'
      backgroundConfig={{ scale: 0.3, strokeWidth: 1.1 }}
    >
      {/* Animated gradient orbs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float' />
        <div
          className='absolute bottom-1/4 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <section
        className='min-h-dvh flex flex-col justify-center items-center p-6 pt-20 lg:aspect-video rounded-md md:p-16 md:pt-20 relative z-10'
        aria-labelledby='hero-title'
        aria-describedby='hero-description'
      >
        {/* Availability Badge */}
        <div
          className='inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm hover:bg-green-500/20 transition-all duration-300 animate-fade-in-down opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500' />
          </span>
          <span className='text-sm text-green-400 font-medium'>Available for new projects</span>
        </div>

        <header
          className='z-10 mb-8 flex flex-col justify-center items-center animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <h1
            id='hero-title'
            className='text-5xl font-bold font-heading flex flex-col mb-6 text-zinc-100 max-w-5xl sm:text-5xl sm:leading-snug md:text-6xl md:leading-snug xl:text-7xl leading-snug xl:leading-tight'
          >
            <span className='animate-fade-in-up opacity-0' style={{ animationFillMode: 'both' }}>
              Crafting High-Performance
            </span>{' '}
            <span
              className='bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-fade-in-up opacity-0'
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              Accessible Web Experiences
            </span>
          </h1>
          <p
            id='hero-description'
            className='text-lg font-light mb-8 text-zinc-300 max-w-2xl md:text-xl leading-relaxed animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            A Frontend Developer specializing in transforming complex challenges into fast,
            intuitive, and inclusive applications with React and Next.js.
          </p>
        </header>

        {/* CTAs */}
        <div
          className='flex flex-col sm:flex-row gap-4 mb-16 z-10 animate-fade-in-up opacity-0'
          style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
        >
          <Link href='#portfolio' passHref>
            <Button
              svg={<MoveDown strokeWidth={1.5} size={20} aria-hidden='true' />}
              label='View my work'
              size='xl'
              variant='primary'
              data-umami-event='hero_cta_click'
              aria-describedby='hero-description'
              className='min-w-[200px] font-semibold shadow-glow-md hover:shadow-glow-lg'
            />
          </Link>
          <Link href='#contact' passHref>
            <Button
              svg={<Mail strokeWidth={1.5} size={20} aria-hidden='true' />}
              label='Get in Touch'
              size='xl'
              variant='secondary'
              data-umami-event='hero_contact_click'
              className='min-w-[200px]'
            />
          </Link>
        </div>

        {/* Stats */}
        <div
          className='grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto pt-8 border-t border-zinc-800/50 backdrop-blur-sm animate-fade-in-up opacity-0'
          style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
        >
          {stats.map(stat => (
            <div
              key={stat.label}
              className='flex flex-col items-center group hover:scale-110 transition-transform duration-300'
            >
              <div className='text-2xl md:text-3xl font-bold text-zinc-100 mb-1 flex items-center gap-1'>
                {stat.value}
                {stat.label === 'Years Experience' && (
                  <Sparkles
                    size={20}
                    className='text-yellow-500 group-hover:animate-spin'
                    aria-hidden='true'
                  />
                )}
              </div>
              <div className='text-xs md:text-sm text-zinc-400 font-light group-hover:text-zinc-300 transition-colors'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </BoxWithBackground>
  );
};

export default Hero;
