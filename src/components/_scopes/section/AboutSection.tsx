import BoxWithBackground from '@/components/BoxWithBackground';
import GlowEffect from '@/components/GlowEffect';

import Section from './_components/Section';

import { CheckCircle, Code, MessageCircle } from 'lucide-react';

const PassionCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}> = ({ icon: Icon, title, description, index }) => {
  return (
    <BoxWithBackground
      className='group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up opacity-0'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}
    >
      <article
        className='h-full w-full p-8 relative overflow-hidden'
        role='article'
        aria-label={title}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0 group-hover:from-zinc-900 group-hover:via-zinc-900/90 transition-all duration-500' />
        <GlowEffect variant='purple-pink' intensity='low' />
        <div className='relative z-10 space-y-4'>
          <div
            className='inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 shadow-glow-sm group-hover:shadow-glow-md'
            aria-hidden='true'
          >
            <Icon className='w-6 h-6 text-white' aria-hidden='true' />
          </div>
          <h3 className='text-xl font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300'>
            {title}
          </h3>
          <p className='text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors'>
            {description}
          </p>
        </div>
      </article>
    </BoxWithBackground>
  );
};

const AboutSection: React.FC = () => {
  const passions = [
    {
      icon: CheckCircle,
      title: 'Delivering Value',
      description:
        'My primary goal is to ship high-quality code that solves business problems and enhances the end-user experience. The success of my projects is measured by the tangible value they deliver.',
    },
    {
      icon: Code,
      title: 'Technical Excellence',
      description:
        'I am committed to writing clean, maintainable, and efficient code. I actively invest time in learning emerging technologies and best practices to ensure my work meets a high standard of excellence.',
    },
    {
      icon: MessageCircle,
      title: 'Collaborative Development',
      description:
        'I excel in agile, cross-functional teams. I prioritize clear communication, knowledge sharing, and constructive code reviews to help the entire team succeed and innovate.',
    },
  ];

  return (
    <Section id='about'>
      <div className='space-y-20'>
        {/* Hero Section */}
        <div
          className='space-y-6 animate-fade-in-up opacity-0'
          style={{ animationFillMode: 'both' }}
        >
          <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>About me</p>
          <h2 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient'>
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
            className='text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl animate-fade-in-up opacity-0'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            I&apos;m a Frontend Developer based in Barcelona. I build elegant, high-performance web
            apps with accessibility in mind. With 4+ years of experience, I focus on React and
            Next.js.
          </p>
        </div>

        {/* Passion Cards */}
        <div className='space-y-10'>
          <h2
            className='text-3xl font-bold text-zinc-100 animate-fade-in-up opacity-0'
            style={{ animationFillMode: 'both' }}
          >
            My Philosophy
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
