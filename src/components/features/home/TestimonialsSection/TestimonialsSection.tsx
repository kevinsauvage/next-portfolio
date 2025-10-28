import { Card, CardContent, CardFooter, CardIcon } from '@/components/ui/Card';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Body, Caption } from '@/components/ui/Typography';
import testimonials from '@/config/content/testimonials';
import { gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
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
    <Card hover='standard' size='sm' glow='secondary-accent' animationIndex={index}>
      <CardContent spacing='md'>
        <div className='flex items-start justify-between'>
          <CardIcon variant='purple'>
            <Quote
              className='text-purple-400 transition-transform group-hover:rotate-12'
              size={iconSizes.md}
              strokeWidth={1.5}
              aria-hidden='true'
            />
          </CardIcon>
          <Caption className='text-blue-400'>{String(index + 1).padStart(2, '0')}</Caption>
        </div>

        <blockquote className='flex-1 text-zinc-200 leading-relaxed text-lg italic line-clamp-6 hover:line-clamp-none'>
          &quot;{content}&quot;
        </blockquote>

        <CardFooter>
          <div className={stackSpacing.xs}>
            <div className={clsx(gapSpacing.xs, 'flex items-center')}>
              <div className='p-2 bg-blue-500/10 rounded-full border border-blue-500/20'>
                <User
                  size={iconSizes.xs}
                  className='text-blue-400 transition-transform group-hover:rotate-12'
                  aria-hidden='true'
                />
              </div>
              <div>
                <cite className='text-zinc-100 font-bold text-base not-italic block'>
                  {author.name}
                </cite>
                <Body className='text-base'>{author.title}</Body>
              </div>
            </div>

            <div className={clsx(gapSpacing.xs, 'flex flex-wrap text-sm text-zinc-400')}>
              <Caption className='flex items-center gap-2'>
                <Briefcase
                  size={iconSizes.xs - 2}
                  className='transition-transform group-hover:rotate-12'
                  aria-hidden='true'
                />
                <span>{author.company}</span>
              </Caption>
              <Caption className='flex items-center gap-2'>
                <span className='w-1 h-1 bg-zinc-600 rounded-full' aria-hidden='true' />
                <span>{author.relationship}</span>
              </Caption>
              <Caption className='flex items-center gap-2'>
                <Calendar
                  size={iconSizes.xs - 2}
                  className='transition-transform group-hover:rotate-12'
                  aria-hidden='true'
                />
                <time dateTime={date}>{date}</time>
              </Caption>
            </div>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <Section id='testimonials'>
      <div className={stackSpacing.lg}>
        <SectionHeader
          overline='Testimonials'
          title='What Colleagues Say'
          description="Notes from engineering leaders and colleagues I've worked with."
        />

        <div className={clsx('grid grid-cols-1 lg:grid-cols-2', gapSpacing.md)}>
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
