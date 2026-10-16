'use client';

import { useState } from 'react';

import { Card, CardContent, CardFooter, CardIcon } from '@/components/ui/Card';
import { NEW_TAB_LABEL } from '@/components/ui/NewTabHint';
import { BodySmall, Caption } from '@/components/ui/Typography';
import { sections } from '@/config/content/sections';
import type { Testimonial } from '@/config/content/testimonials';
import { LINKEDIN_URL } from '@/config/site';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';
import { toDateTime } from '@/lib/date';
import { padIndex } from '@/lib/format';

import clsx from 'clsx';
import { Briefcase, Calendar, ChevronDown, ExternalLink, Quote } from 'lucide-react';

type TestimonialCardProps = Pick<Testimonial, 'author' | 'content' | 'excerpt' | 'date'> & {
  index: number;
  totalCount: number;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  const first = parts.at(0)?.at(0) ?? '';
  const last = parts.length > 1 ? (parts.at(-1)?.at(0) ?? '') : '';
  return `${first}${last}`.toUpperCase();
};

const ICON_HOVER = 'transition-transform group-hover:rotate-12 duration-200';
const META_ITEM = 'flex items-center gap-1.5 md:gap-2';

const TestimonialContent = ({
  authorName,
  content,
  excerpt,
}: {
  authorName: string;
  content: string;
  excerpt: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='flex-1 space-y-3'>
      <blockquote className='leading-relaxed italic text-zinc-200 text-sm md:text-base lg:text-lg mb-4 md:mb-8 line-clamp-6'>
        &quot;{expanded ? content : excerpt}&quot;
      </blockquote>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <button
          type='button'
          onClick={() => setExpanded(previous => !previous)}
          aria-expanded={expanded}
          className='inline-flex min-h-11 items-center gap-1 text-xs font-medium text-zinc-300 hover:text-zinc-100 transition-colors duration-200 underline-offset-4 hover:underline'
        >
          {expanded ? sections.testimonials.showLess : sections.testimonials.readMore}
          <ChevronDown
            size={14}
            aria-hidden='true'
            className={clsx('transition-transform duration-200', expanded && 'rotate-180')}
          />
        </button>
        <a
          href={LINKEDIN_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors duration-200 underline-offset-4 hover:underline'
          data-analytics-event={ANALYTICS_EVENTS.TESTIMONIAL_LINKEDIN_CLICK}
          aria-label={`Via LinkedIn — read ${authorName}'s full recommendation (${NEW_TAB_LABEL})`}
        >
          Via LinkedIn
          <ExternalLink size={12} aria-hidden='true' />
        </a>
      </div>
    </div>
  );
};

const TestimonialAuthor = ({ author, date }: Pick<Testimonial, 'author' | 'date'>) => (
  <CardFooter>
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <div
          className='bg-primary-500/10 rounded-full border border-primary-500/20 group-hover:border-primary-500/40 transition-colors flex items-center justify-center p-2 md:p-3'
          aria-hidden='true'
        >
          <span className='font-mono text-xs md:text-sm font-semibold text-primary-300 whitespace-nowrap'>
            {getInitials(author.name)}
          </span>
        </div>
        <div>
          <cite className='font-bold not-italic block text-zinc-50 text-base md:text-lg lg:text-xl mb-0.5 md:mb-1'>
            {author.name}
          </cite>
          <BodySmall className='text-sm md:text-base lg:text-lg'>{author.title}</BodySmall>
        </div>
      </div>

      <div className='gap-2 flex flex-wrap text-zinc-400 text-xs md:text-sm lg:text-base'>
        <Caption className={META_ITEM}>
          <Briefcase
            size={12}
            className={clsx(ICON_HOVER, 'md:w-3.5 md:h-3.5')}
            aria-hidden='true'
          />
          <span>{author.company}</span>
        </Caption>
        <Caption className={META_ITEM}>
          <span className='bg-zinc-600 rounded-full w-1 h-1 md:w-1.5 md:h-1.5' aria-hidden='true' />
          <span>{author.relationship}</span>
        </Caption>
        <Caption className={META_ITEM}>
          <Calendar
            size={12}
            className={clsx(ICON_HOVER, 'md:w-3.5 md:h-3.5')}
            aria-hidden='true'
          />
          <time dateTime={toDateTime(date)}>{date}</time>
        </Caption>
      </div>
    </div>
  </CardFooter>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  author,
  content,
  excerpt,
  date,
  index,
  totalCount,
}) => (
  <Card hover='standard' size='md' glow='secondary-accent' animationIndex={index} className='h-fit'>
    <CardContent spacing='md' className='md:space-y-6'>
      <div className='flex items-start justify-between mb-4 md:mb-6'>
        <CardIcon variant='purple'>
          <Quote
            className={clsx('text-primary-400', ICON_HOVER, 'w-5 h-5 md:w-6 md:h-6')}
            size={20}
            strokeWidth={1.5}
            aria-hidden='true'
          />
        </CardIcon>
        <Caption className='text-secondary-400 text-xs md:text-sm font-semibold'>
          {padIndex(index + 1)} / {padIndex(totalCount)}
        </Caption>
      </div>
      <TestimonialContent authorName={author.name} content={content} excerpt={excerpt} />
      <TestimonialAuthor author={author} date={date} />
    </CardContent>
  </Card>
);

export default TestimonialCard;
