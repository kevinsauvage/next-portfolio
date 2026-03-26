import { Card, CardContent, CardFooter, CardIcon } from '@/components/ui/Card';
import { BodySmall, Caption } from '@/components/ui/Typography';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';
import { Briefcase, Calendar, ExternalLink, Quote, User } from 'lucide-react';

type TestimonialCardProps = {
  author: {
    name: string;
    title: string;
    company: string;
    relationship: string;
  };
  content: string;
  date: string;
  index: number;
  variant?: 'default' | 'carousel';
  totalCount?: number;
};

// Shared constants
const ICON_HOVER = 'transition-transform group-hover:rotate-12 duration-300';
const FLEX_CENTER = 'flex items-center';

// Variant-specific style presets
const variantStyles = {
  default: {
    cardSize: 'sm' as const,
    contentClass: '',
    headerClass: '',
    quoteIconClass: '',
    captionClass: '',
    blockquoteClass: 'text-sm line-clamp-5',
    authorRowClass: '',
    avatarClass: 'p-2',
    userIconClass: '',
    citeClass: 'text-base',
    titleClass: '',
    metaClass: 'text-sm',
    gapClass: 'gap-2',
    dotClass: 'w-1 h-1',
    smallIconClass: '',
  },
  carousel: {
    cardSize: 'md' as const,
    contentClass: 'md:space-y-6',
    headerClass: 'mb-4 md:mb-6',
    quoteIconClass: 'w-5 h-5 md:w-6 md:h-6',
    captionClass: 'text-xs md:text-sm font-semibold',
    blockquoteClass: 'text-sm md:text-base lg:text-lg mb-4 md:mb-8 line-clamp-6',
    authorRowClass: 'md:gap-md',
    avatarClass: 'p-2 md:p-3',
    userIconClass: 'md:w-4 md:h-4',
    citeClass: 'text-base md:text-lg lg:text-xl mb-0.5 md:mb-1',
    titleClass: 'text-sm md:text-base lg:text-lg',
    metaClass: 'md:gap-sm text-xs md:text-sm lg:text-base',
    gapClass: 'gap-1.5 md:gap-2',
    dotClass: 'w-1 h-1 md:w-1.5 md:h-1.5',
    smallIconClass: 'md:w-3.5 md:h-3.5',
  },
};

const TestimonialHeader = ({
  indexDisplay,
  styles,
}: {
  indexDisplay: string;
  styles: typeof variantStyles.default | typeof variantStyles.carousel;
}) => {
  return (
    <div className={clsx('flex items-start justify-between', styles.headerClass)}>
      <CardIcon variant='purple'>
        <Quote
          className={clsx('text-purple-400', ICON_HOVER, styles.quoteIconClass)}
          size={20}
          strokeWidth={1.5}
          aria-hidden='true'
        />
      </CardIcon>
      <Caption className={clsx('text-blue-400', styles.captionClass)}>{indexDisplay}</Caption>
    </div>
  );
};

const TestimonialContent = ({
  content,
  styles,
}: {
  content: string;
  styles: typeof variantStyles.default | typeof variantStyles.carousel;
}) => {
  return (
    <div className='flex-1 space-y-3'>
      <blockquote className={clsx('leading-relaxed italic text-zinc-200', styles.blockquoteClass)}>
        &quot;{content}&quot;
      </blockquote>
      <a
        href='https://www.linkedin.com/in/kevin-sauvage/'
        target='_blank'
        rel='noopener noreferrer'
        className={clsx(
          'inline-flex items-center gap-1.5 text-xs font-medium',
          'text-primary-400 hover:text-primary-300',
          'transition-colors duration-200',
          'underline-offset-4 hover:underline'
        )}
        data-umami-event={UMAMI_EVENTS.TESTIMONIAL_LINKEDIN_CLICK}
        aria-label='See more testimonials'
        title='See more testimonials'
      >
        See more testimonials
        <ExternalLink size={12} aria-hidden='true' />
      </a>
    </div>
  );
};

const TestimonialAuthor = ({
  author,
  date,
  styles,
}: {
  author: { name: string; title: string; company: string; relationship: string };
  date: string;
  styles: typeof variantStyles.default | typeof variantStyles.carousel;
}) => {
  return (
    <CardFooter>
      <div className='space-y-4'>
        <div className={clsx('gap-2', styles.authorRowClass, FLEX_CENTER)}>
          <div
            className={clsx(
              'bg-blue-500/10 rounded-full border border-blue-500/20 group-hover:border-blue-500/40 transition-colors',
              styles.avatarClass
            )}
          >
            <User
              size={14}
              className={clsx('text-blue-400', ICON_HOVER, styles.userIconClass)}
              aria-hidden='true'
            />
          </div>
          <div>
            <cite className={clsx('font-bold not-italic block text-zinc-50', styles.citeClass)}>
              {author.name}
            </cite>
            <BodySmall className={styles.titleClass}>{author.title}</BodySmall>
          </div>
        </div>

        <div className={clsx('gap-2 flex flex-wrap text-zinc-400', styles.metaClass)}>
          <Caption className={clsx(FLEX_CENTER, styles.gapClass)}>
            <Briefcase
              size={12}
              className={clsx(ICON_HOVER, styles.smallIconClass)}
              aria-hidden='true'
            />
            <span>{author.company}</span>
          </Caption>
          <Caption className={clsx(FLEX_CENTER, styles.gapClass)}>
            <span
              className={clsx('bg-zinc-600 rounded-full', styles.dotClass)}
              aria-hidden='true'
            />
            <span>{author.relationship}</span>
          </Caption>
          <Caption className={clsx(FLEX_CENTER, styles.gapClass)}>
            <Calendar
              size={12}
              className={clsx(ICON_HOVER, styles.smallIconClass)}
              aria-hidden='true'
            />
            <time dateTime={date}>{date}</time>
          </Caption>
        </div>
      </div>
    </CardFooter>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  author,
  content,
  date,
  index,
  variant = 'default',
  totalCount,
}) => {
  const styles = variant === 'carousel' ? variantStyles.carousel : variantStyles.default;
  const currentIndex = String(index + 1).padStart(2, '0');
  const totalDisplay =
    variant === 'carousel' && totalCount ? String(totalCount).padStart(2, '0') : '';
  const indexDisplay = totalDisplay ? `${currentIndex} / ${totalDisplay}` : currentIndex;

  return (
    <Card
      hover='standard'
      size={styles.cardSize}
      glow='secondary-accent'
      animationIndex={index}
      className='h-fit'
    >
      <CardContent spacing='md' className={styles.contentClass}>
        <TestimonialHeader indexDisplay={indexDisplay} styles={styles} />
        <TestimonialContent content={content} styles={styles} />
        <TestimonialAuthor author={author} date={date} styles={styles} />
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
