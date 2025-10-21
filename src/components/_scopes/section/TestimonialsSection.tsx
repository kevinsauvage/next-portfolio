import testimonials from '@/config/testimonials.config';
import BoxWithBackground from '@/components/BoxWithBackground';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

import { Quote } from 'lucide-react';

const TestimonialCard: React.FC<{
  author: {
    name: string;
    title: string;
    company: string;
    relationship: string;
  };
  content: string;
  date: string;
}> = ({ author, content, date }) => {
  return (
    <BoxWithBackground className='h-full'>
      <article className='p-6 h-full flex flex-col justify-between bg-gradient-to-t from-zinc-950 to-zinc-900/70'>
        <div className='flex-1'>
          <Quote className='text-zinc-400 mb-6' size={32} strokeWidth={1} aria-hidden='true' />
          <blockquote className='text-zinc-100 font-light text-lg leading-relaxed mb-8'>
            "{content}"
          </blockquote>
        </div>
        <footer className='border-t border-zinc-700 pt-6'>
          <div className='flex flex-col space-y-2'>
            <cite className='text-zinc-50 font-semibold font-heading text-xl not-italic'>
              {author.name}
            </cite>
            <p className='text-zinc-200 text-base font-light'>{author.title}</p>
            <p className='text-zinc-300 text-sm font-light'>
              {author.company} • {author.relationship}
            </p>
            <time className='text-zinc-400 text-sm font-light' dateTime='2025-09'>
              {date}
            </time>
          </div>
        </footer>
      </article>
    </BoxWithBackground>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <Section id='testimonials'>
      <SectionHeader>
        <SectionTitle>What Colleagues Say</SectionTitle>
        <SectionDescription>
          Recommendations from engineering leaders and colleagues who have worked with me directly
          at Decathlon International.
        </SectionDescription>
      </SectionHeader>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.author.name}-${index}`} {...testimonial} />
        ))}
      </div>
    </Section>
  );
};

export default TestimonialsSection;
