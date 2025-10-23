import BoxWithBackground from '@/components/BoxWithBackground';
import GlowEffect from '@/components/GlowEffect';
import { passions } from '@/config/passions.config';

import Section from './_components/Section';

const PassionCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}> = ({ icon: Icon, title, description, index }) => {
  return (
    <BoxWithBackground
      className='group hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500 animate-fade-in-up opacity-0'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}
    >
      <article
        className='h-full w-full p-5 sm:p-6 md:p-8 relative overflow-hidden'
        role='article'
        aria-label={title}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0 group-hover:from-zinc-900 group-hover:via-zinc-900/90 transition-all duration-500' />
        <GlowEffect variant='secondary-accent' intensity='low' />
        <div className='relative z-10 space-y-4'>
          <div
            className='inline-flex p-3 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 shadow-glow-sm group-hover:shadow-glow-md'
            aria-hidden='true'
          >
            <Icon className='w-6 h-6 text-white' aria-hidden='true' />
          </div>
          <h3 className='text-xl font-bold text-zinc-100 group-hover:text-accent-400 transition-all duration-300'>
            {title}
          </h3>
          <p className='text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors font-light'>
            {description}
          </p>
        </div>
      </article>
    </BoxWithBackground>
  );
};

const AboutSection: React.FC = () => {
  return (
    <Section id='about'>
      <div className='space-y-16 sm:space-y-24 md:space-y-32'>
        {/* Hero Section */}
        <div
          className='space-y-6 animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <p className='text-sm font-medium text-primary-400 tracking-wider uppercase'>About me</p>
          <h2 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient'>
              Hi, I&apos;m Kévin Sauvage
            </span>
          </h2>
          <div
            className='flex flex-wrap items-center gap-6 mb-8 animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <div className='flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm'>
              <div className='h-2 w-2 rounded-full bg-blue-400 animate-pulse' />
              <span className='text-lg font-semibold text-blue-400'>4+ Years Experience</span>
            </div>
          </div>
          <p
            className='text-xl md:text-2xl text-zinc-300 leading-loose max-w-4xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            I&apos;m a Frontend Developer in Barcelona, crafting high-performance, accessible web
            applications. With over four years of experience, I specialize in building modern
            solutions with React and Next.js that are both user-centric and robust.
          </p>
        </div>

        {/* Passion Cards */}
        <div className='space-y-6 sm:space-y-8 md:space-y-10'>
          <h2
            className='text-3xl font-semibold text-zinc-100 animate-fade-in-up opacity-0'
            style={{ animationFillMode: 'both' }}
          >
            My Philosophy
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12'>
            {passions.map((passion, index) => (
              <PassionCard key={passion.title} {...passion} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
