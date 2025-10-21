import BoxWithBackground from '@/components/BoxWithBackground';
import testimonials from '@/config/testimonials.config';

import Section from './_components/Section';

import { Briefcase, Calendar, Quote, User } from 'lucide-react';

const TestimonialCard: React.FC<{
  author: {
    name: string;
    title: string;
    company: string;
    relationship: string;
  };
  content: string;
  date: string;
  index: number;
}> = ({ author, content, date, index }) => {
  return (
    <BoxWithBackground
      className='group h-fit hover:-translate-y-1 transition-all duration-300'
      backgroundConfig={{ scale: 0.2, strokeWidth: 1 }}
    >
      <article className='h-fit w-full p-6'>
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0' />
        <div className='relative z-10 h-full flex flex-col justify-between space-y-4'>
          {/* Quote Icon & Number */}
          <div className='flex items-start justify-between'>
            <div className='p-2 bg-purple-500/10 rounded-lg border border-purple-500/20'>
              <Quote className='text-purple-400' size={20} strokeWidth={1.5} aria-hidden='true' />
            </div>
            <span className='text-sm font-medium text-blue-400'>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Testimonial Content */}
          <blockquote className='flex-1 text-zinc-200 leading-relaxed text-base italic line-clamp-6 hover:line-clamp-none'>
            &quot;{content}&quot;
          </blockquote>

          {/* Author Info */}
          <footer className='border-t border-zinc-800 pt-4 space-y-3'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-500/10 rounded-full border border-blue-500/20'>
                <User size={14} className='text-blue-400' aria-hidden='true' />
              </div>
              <div>
                <cite className='text-zinc-100 font-bold text-base not-italic block'>
                  {author.name}
                </cite>
                <p className='text-zinc-400 text-sm'>{author.title}</p>
              </div>
            </div>

            <div className='flex flex-wrap gap-3 text-xs text-zinc-400'>
              <div className='flex items-center gap-2'>
                <Briefcase size={12} aria-hidden='true' />
                <span>{author.company}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-1 h-1 bg-zinc-600 rounded-full' aria-hidden='true' />
                <span>{author.relationship}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar size={12} aria-hidden='true' />
                <time dateTime={date}>{date}</time>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </BoxWithBackground>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <Section id='testimonials'>
      <div className='space-y-12'>
        {/* Header Section */}
        <div className='space-y-4'>
          <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>Testimonials</p>
          <h2 className='text-3xl md:text-5xl font-bold'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
              What Colleagues Say
            </span>
          </h2>
          <p className='text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl'>
            Recommendations from engineering leaders and colleagues who have worked with me directly
            at Decathlon International.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author.name}-${index}`}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
