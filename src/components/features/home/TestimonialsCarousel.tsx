'use client';

import { useCallback, useState } from 'react';

import { Card, CardContent, CardFooter, CardIcon } from '@/components/ui/Card';
import { Body, Caption } from '@/components/ui/Typography';
import { colors, gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
import { Briefcase, Calendar, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';

type Testimonial = {
  id: string;
  author: {
    name: string;
    title: string;
    company: string;
    relationship: string;
  };
  content: string;
  date: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

const FOCUS_RING_CLASSES =
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950';
const ANIMATION_DURATION = 400;
const ANIMATION_RESET_DELAY = 50;

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const resetAnimation = useCallback(() => {
    setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_RESET_DELAY);
  }, []);

  const updateSlideIndex = useCallback(
    (newIndex: number) => {
      setCurrentIndex(newIndex);
      setDisplayedIndex(newIndex);
      resetAnimation();
    },
    [resetAnimation]
  );

  const goToSlide = (index: number) => {
    if (index === currentIndex || isAnimating) return;
    if (index < 0 || index >= testimonials.length) return;
    setDirection(index > currentIndex ? 'right' : 'left');
    setIsAnimating(true);
    setTimeout(() => {
      updateSlideIndex(index);
    }, ANIMATION_DURATION);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlideIndex(prevIndex);
    }, ANIMATION_DURATION);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      updateSlideIndex(nextIndex);
    }, ANIMATION_DURATION);
  };

  // Safe array access to avoid object injection warning
  const currentTestimonial: Testimonial | null =
    displayedIndex >= 0 && displayedIndex < testimonials.length
      ? (testimonials.find((_, idx) => idx === displayedIndex) ?? null)
      : null;

  return (
    <div className={stackSpacing.md}>
      <div className='relative px-4 md:px-12 lg:px-20'>
        {testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              aria-label='Previous testimonial'
              tabIndex={-1}
              className={clsx(
                'absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20',
                'p-2 md:p-3 lg:p-4 rounded-full',
                'bg-zinc-900/95 backdrop-blur-md border border-zinc-700',
                'hover:bg-zinc-800 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20',
                'active:scale-90',
                'transition-all duration-300 ease-out',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                'group shadow-lg md:shadow-xl'
              )}
            >
              <ChevronLeft
                size={iconSizes.sm}
                className={clsx(
                  'md:w-5 md:h-5',
                  colors.text.secondary,
                  'group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300'
                )}
                aria-hidden='true'
              />
            </button>

            <button
              onClick={goToNext}
              disabled={isAnimating}
              aria-label='Next testimonial'
              tabIndex={-1}
              className={clsx(
                'absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20',
                'p-2 md:p-3 lg:p-4 rounded-full',
                'bg-zinc-900/95 backdrop-blur-md border border-zinc-700',
                'hover:bg-zinc-800 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20',
                'active:scale-90',
                'transition-all duration-300 ease-out',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                'group shadow-lg md:shadow-xl'
              )}
            >
              <ChevronRight
                size={iconSizes.sm}
                className={clsx(
                  'md:w-5 md:h-5',
                  colors.text.secondary,
                  'group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300'
                )}
                aria-hidden='true'
              />
            </button>
          </>
        )}

        <div
          className={clsx(
            'relative transition-all duration-500 ease-in-out',
            isAnimating &&
              direction === 'right' &&
              'opacity-0 translate-x-4 md:translate-x-8 scale-95',
            isAnimating &&
              direction === 'left' &&
              'opacity-0 -translate-x-4 md:-translate-x-8 scale-95',
            !isAnimating && 'opacity-100 translate-x-0 scale-100'
          )}
        >
          <Card
            hover='standard'
            size='md'
            glow='secondary-accent'
            animationIndex={currentIndex}
            className='h-fit'
          >
            <CardContent spacing='md' className='md:space-y-6'>
              <div className='flex items-start justify-between mb-4 md:mb-6'>
                <CardIcon variant='purple'>
                  <Quote
                    className={clsx(
                      colors.brandColors.purple,
                      'transition-transform group-hover:rotate-12 duration-300 w-5 h-5 md:w-6 md:h-6'
                    )}
                    size={iconSizes.md}
                    strokeWidth={1.5}
                    aria-hidden='true'
                  />
                </CardIcon>
                <Caption className={clsx(colors.status.info, 'text-xs md:text-sm font-semibold')}>
                  {String(currentIndex + 1).padStart(2, '0')} /{' '}
                  {String(testimonials.length).padStart(2, '0')}
                </Caption>
              </div>

              <blockquote
                className={clsx(
                  'flex-1 leading-relaxed text-base md:text-lg lg:text-xl italic mb-4 md:mb-8',
                  colors.text.secondary,
                  'transition-opacity duration-300'
                )}
              >
                &quot;{currentTestimonial?.content ?? ''}&quot;
              </blockquote>

              <CardFooter>
                <div className={stackSpacing.sm}>
                  <div className={clsx(gapSpacing.sm, 'md:gap-md flex items-center')}>
                    <div className='p-2 md:p-3 bg-blue-500/10 rounded-full border border-blue-500/20 group-hover:border-blue-500/40 transition-colors'>
                      <User
                        size={iconSizes.xs}
                        className={clsx(
                          'md:w-4 md:h-4',
                          colors.status.info,
                          'transition-transform group-hover:rotate-12 duration-300'
                        )}
                        aria-hidden='true'
                      />
                    </div>
                    <div>
                      <cite
                        className={clsx(
                          'font-bold text-base md:text-lg lg:text-xl not-italic block mb-0.5 md:mb-1',
                          colors.text.primary
                        )}
                      >
                        {currentTestimonial?.author?.name ?? ''}
                      </cite>
                      <Body className='text-sm md:text-base lg:text-lg'>
                        {currentTestimonial?.author?.title ?? ''}
                      </Body>
                    </div>
                  </div>

                  <div
                    className={clsx(
                      gapSpacing.xs,
                      'md:gap-sm flex flex-wrap text-xs md:text-sm lg:text-base',
                      colors.text.muted
                    )}
                  >
                    <Caption className='flex items-center gap-1.5 md:gap-2'>
                      <Briefcase
                        size={iconSizes.xs - 2}
                        className='md:w-3.5 md:h-3.5 transition-transform group-hover:rotate-12 duration-300'
                        aria-hidden='true'
                      />
                      <span>{currentTestimonial?.author?.company ?? ''}</span>
                    </Caption>
                    <Caption className='flex items-center gap-1.5 md:gap-2'>
                      <span
                        className='w-1 h-1 md:w-1.5 md:h-1.5 bg-zinc-600 rounded-full'
                        aria-hidden='true'
                      />
                      <span>{currentTestimonial?.author?.relationship ?? ''}</span>
                    </Caption>
                    <Caption className='flex items-center gap-1.5 md:gap-2'>
                      <Calendar
                        size={iconSizes.xs - 2}
                        className='md:w-3.5 md:h-3.5 transition-transform group-hover:rotate-12 duration-300'
                        aria-hidden='true'
                      />
                      <time dateTime={currentTestimonial?.date ?? ''}>
                        {currentTestimonial?.date ?? ''}
                      </time>
                    </Caption>
                  </div>
                </div>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div
          className={clsx(
            'flex justify-center items-center',
            gapSpacing.sm,
            'md:gap-md mt-4 md:mt-6'
          )}
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial?.id ?? `testimonial-${index}`}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              aria-label={`Go to testimonial ${index + 1}`}
              className={clsx(
                'transition-all duration-300 rounded-full',
                FOCUS_RING_CLASSES,
                'disabled:opacity-50 disabled:cursor-not-allowed',
                index === currentIndex
                  ? 'w-8 h-2 md:w-10 md:h-2.5 bg-blue-500 shadow-lg shadow-blue-500/50'
                  : 'w-2 h-2 md:w-2.5 md:h-2.5 bg-zinc-700 hover:bg-zinc-600 hover:w-6 md:hover:w-8 hover:h-2'
              )}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
