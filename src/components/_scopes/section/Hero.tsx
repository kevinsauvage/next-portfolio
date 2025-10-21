import Link from 'next/link';

import Button from '@/components/Button';

import BoxWithBackground from '../../BoxWithBackground';

import { Mail, MoveDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
  ];

  return (
    <BoxWithBackground
      className='relative p-0 gap-4 text-center bg-gradient-to-t from-zinc-950 to-zinc-900/70 border-0 justify-start '
      backgroundConfig={{ scale: 0.3, strokeWidth: 1.1 }}
    >
      <section
        className='min-h-dvh flex flex-col justify-center items-center p-6 pt-20 lg:aspect-video rounded-md md:p-16 md:pt-20'
        aria-labelledby='hero-title'
        aria-describedby='hero-description'
      >
        {/* Availability Badge */}
        <div className='inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-500/10 border border-green-500/20 rounded-full'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500' />
          </span>
          <span className='text-sm text-green-400 font-medium'>Available for new projects</span>
        </div>

        <header className='z-10 mb-8 flex flex-col justify-center items-center'>
          <h1
            id='hero-title'
            className='text-4xl font-bold font-heading flex flex-col mb-6 text-zinc-100 max-w-5xl sm:text-5xl sm:leading-snug md:text-6xl md:leading-snug xl:text-7xl leading-snug xl:leading-tight'
          >
            Building Digital Experiences{' '}
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
              That Drive Results
            </span>
          </h1>
          <p
            id='hero-description'
            className='text-lg font-light mb-8 text-zinc-300 max-w-2xl md:text-xl leading-relaxed'
          >
            I&apos;m a Frontend Developer who transforms complex ideas into intuitive,
            high-performance web applications. Specializing in React, Next.js, and
            accessibility-first design.
          </p>
        </header>

        {/* CTAs */}
        <div className='flex flex-col sm:flex-row gap-4 mb-16 z-10'>
          <Link href='#portfolio' passHref>
            <Button
              svg={<MoveDown strokeWidth={1.5} size={20} aria-hidden='true' />}
              label='Explore My Work'
              size='xl'
              variant='primary'
              data-umami-event='hero_cta_click'
              aria-describedby='hero-description'
              className='min-w-[200px] font-semibold'
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
        <div className='grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-zinc-800/50'>
          {stats.map(stat => (
            <div key={stat.label} className='flex flex-col items-center'>
              <div className='text-2xl md:text-3xl font-bold text-zinc-100 mb-1 flex items-center gap-1'>
                {stat.value}
                {stat.label === 'Years Experience' && (
                  <Sparkles size={20} className='text-yellow-500' aria-hidden='true' />
                )}
              </div>
              <div className='text-xs md:text-sm text-zinc-400 font-light'>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </BoxWithBackground>
  );
};

export default Hero;
