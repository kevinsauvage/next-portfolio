import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './_components/Section';

import { Sparkles, TrendingUp, Users } from 'lucide-react';

const PassionCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => {
  return (
    <BoxWithBackground
      className='group hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
    >
      <div className='h-full w-full p-8'>
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0' />
        <div className='relative z-10 space-y-4'>
          <div className='inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600'>
            <Icon className='w-6 h-6 text-white' />
          </div>
          <h3 className='text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors'>
            {title}
          </h3>
          <p className='text-zinc-400 leading-relaxed'>{description}</p>
        </div>
      </div>
    </BoxWithBackground>
  );
};

const AboutSection: React.FC = () => {
  const passions = [
    {
      icon: Sparkles,
      title: 'Passionate About Impact',
      description:
        "I thrive on creating solutions that genuinely improve people's lives. At Decathlon, I optimize checkout experiences and ensure seamless functionality across multiple countries. Every line of code I write aims to solve real problems and deliver tangible value.",
    },
    {
      icon: TrendingUp,
      title: 'Always Growing',
      description:
        "Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and best practices. From mastering TypeScript to diving deep into performance optimization, I believe that continuous learning is the foundation of excellence.",
    },
    {
      icon: Users,
      title: 'Team Player',
      description:
        'The best solutions emerge from collaboration. I excel in cross-functional teams, actively share knowledge, and believe that diverse perspectives drive innovation. Whether mentoring juniors or learning from seniors, I value every opportunity to grow together.',
    },
  ];

  return (
    <Section id='about'>
      <div className='space-y-20'>
        {/* Hero Section */}
        <div className='space-y-6'>
          <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>About me</p>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
              Hi, I&apos;m Kévin Sauvage
            </span>
          </h1>
          <div className='flex flex-wrap items-center gap-6 mb-8'>
            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-blue-400 animate-pulse' />
              <span className='text-lg font-semibold text-blue-400'>5+ Years Experience</span>
            </div>
          </div>
          <p className='text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl'>
            Frontend Developer based in Barcelona, Spain. I transform ideas into elegant,
            high-performance web applications that users love. With 5+ years of experience, I
            specialize in React, Next.js, and creating accessibility-first experiences.
          </p>
        </div>

        {/* Passion Cards */}
        <div className='space-y-10'>
          <h2 className='text-3xl font-bold text-zinc-100'>My Passion for Coding</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {passions.map(passion => (
              <PassionCard key={passion.title} {...passion} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
