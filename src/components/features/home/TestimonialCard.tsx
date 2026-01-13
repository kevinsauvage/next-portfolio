import { Card, CardContent, CardFooter, CardIcon } from '@/components/ui/Card';
import { BodySmall, Caption } from '@/components/ui/Typography';
import { colors, gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
import { Briefcase, Calendar, Quote, User } from 'lucide-react';

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

// Style constants to reduce duplication
const ICON_HOVER = 'transition-transform group-hover:rotate-12 duration-300';
const CAROUSEL_ICON_SIZE = 'md:w-3.5 md:h-3.5';
const CAROUSEL_GAP = 'gap-1.5 md:gap-2';
const DEFAULT_GAP = 'gap-2';
const FLEX_CENTER = 'flex items-center';

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  author,
  content,
  date,
  index,
  variant = 'default',
  totalCount,
}) => {
  const isCarousel = variant === 'carousel';
  const gapClass = isCarousel ? CAROUSEL_GAP : DEFAULT_GAP;
  const indexDisplay = `${String(index + 1).padStart(2, '0')}${isCarousel && totalCount ? ` / ${String(totalCount).padStart(2, '0')}` : ''}`;

  return (
    <Card
      hover='standard'
      size={isCarousel ? 'md' : 'sm'}
      glow='secondary-accent'
      animationIndex={index}
      className='h-fit'
    >
      <CardContent spacing='md' className={isCarousel ? 'md:space-y-6' : ''}>
        <div className={clsx('flex items-start justify-between', isCarousel && 'mb-4 md:mb-6')}>
          <CardIcon variant='purple'>
            <Quote
              className={clsx(
                colors.brandColors.purple,
                ICON_HOVER,
                isCarousel && 'w-5 h-5 md:w-6 md:h-6'
              )}
              size={iconSizes.md}
              strokeWidth={1.5}
              aria-hidden='true'
            />
          </CardIcon>
          <Caption
            className={clsx(colors.status.info, isCarousel && 'text-xs md:text-sm font-semibold')}
          >
            {indexDisplay}
          </Caption>
        </div>

        <blockquote
          className={clsx(
            'flex-1 leading-relaxed italic',
            colors.text.secondary,
            isCarousel
              ? 'text-sm md:text-base lg:text-lg mb-4 md:mb-8'
              : 'text-sm line-clamp-6 hover:line-clamp-none'
          )}
        >
          &quot;{content}&quot;
        </blockquote>

        <CardFooter>
          <div className={stackSpacing.xs}>
            <div className={clsx(gapSpacing.xs, isCarousel && 'md:gap-md', FLEX_CENTER)}>
              <div
                className={clsx(
                  'bg-blue-500/10 rounded-full border border-blue-500/20 group-hover:border-blue-500/40 transition-colors',
                  isCarousel ? 'p-2 md:p-3' : 'p-2'
                )}
              >
                <User
                  size={iconSizes.xs}
                  className={clsx(colors.status.info, ICON_HOVER, isCarousel && 'md:w-4 md:h-4')}
                  aria-hidden='true'
                />
              </div>
              <div>
                <cite
                  className={clsx(
                    'font-bold not-italic block',
                    colors.text.primary,
                    isCarousel ? 'text-base md:text-lg lg:text-xl mb-0.5 md:mb-1' : 'text-base'
                  )}
                >
                  {author.name}
                </cite>
                <BodySmall className={isCarousel ? 'text-sm md:text-base lg:text-lg' : ''}>
                  {author.title}
                </BodySmall>
              </div>
            </div>

            <div
              className={clsx(
                gapSpacing.xs,
                'flex flex-wrap',
                colors.text.muted,
                isCarousel ? 'md:gap-sm text-xs md:text-sm lg:text-base' : 'text-sm'
              )}
            >
              <Caption className={clsx(FLEX_CENTER, gapClass)}>
                <Briefcase
                  size={iconSizes.xs - 2}
                  className={clsx(ICON_HOVER, isCarousel && CAROUSEL_ICON_SIZE)}
                  aria-hidden='true'
                />
                <span>{author.company}</span>
              </Caption>
              <Caption className={clsx(FLEX_CENTER, gapClass)}>
                <span
                  className={clsx(
                    'bg-zinc-600 rounded-full',
                    isCarousel ? 'w-1 h-1 md:w-1.5 md:h-1.5' : 'w-1 h-1'
                  )}
                  aria-hidden='true'
                />
                <span>{author.relationship}</span>
              </Caption>
              <Caption className={clsx(FLEX_CENTER, gapClass)}>
                <Calendar
                  size={iconSizes.xs - 2}
                  className={clsx(ICON_HOVER, isCarousel && CAROUSEL_ICON_SIZE)}
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

export default TestimonialCard;
