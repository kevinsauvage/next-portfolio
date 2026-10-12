'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import TestimonialCard from '@/components/features/home/TestimonialCard';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  id: string;
  author: {
    name: string;
    title: string;
    company: string;
    relationship: string;
  };
  content: string;
  excerpt: string;
  date: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

const FOCUS_RING_CLASSES =
  'focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 focus:ring-offset-black';
const ANIMATION_DURATION = 400;
const ANIMATION_RESET_DELAY = 50;

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const resetAnimation = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_RESET_DELAY);
    return () => clearTimeout(timeoutId);
  }, []);

  const updateSlideIndex = useCallback(
    (newIndex: number) => {
      setCurrentIndex(newIndex);
      setDisplayedIndex(newIndex);
      resetAnimation();
    },
    [resetAnimation]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isAnimating) return;
      if (index < 0 || index >= testimonials.length) return;
      trackEvent(ANALYTICS_EVENTS.TESTIMONIALS_CAROUSEL_DOT, { index: String(index) });
      setDirection(index > currentIndex ? 'right' : 'left');
      setIsAnimating(true);
      setTimeout(() => {
        updateSlideIndex(index);
      }, ANIMATION_DURATION);
    },
    [currentIndex, isAnimating, testimonials.length, updateSlideIndex]
  );

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    trackEvent(ANALYTICS_EVENTS.TESTIMONIALS_CAROUSEL_ARROW, { direction: 'prev' });
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlideIndex(prevIndex);
    }, ANIMATION_DURATION);
  }, [currentIndex, isAnimating, testimonials.length, updateSlideIndex]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    trackEvent(ANALYTICS_EVENTS.TESTIMONIALS_CAROUSEL_ARROW, { direction: 'next' });
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      updateSlideIndex(nextIndex);
    }, ANIMATION_DURATION);
  }, [currentIndex, isAnimating, testimonials.length, updateSlideIndex]);

  const currentTestimonial = useMemo(() => {
    if (displayedIndex < 0 || displayedIndex >= testimonials.length) {
      return null;
    }

    return testimonials.at(displayedIndex) ?? null;
  }, [testimonials, displayedIndex]);

  /**
   * Arrow keys move the carousel whenever focus is inside it: the event bubbles
   * up from whichever control has focus (prev/next buttons or the dots).
   *
   * The listener is attached to the region's DOM node rather than through JSX,
   * and the region is deliberately *not* a tab stop: a focusable non-interactive
   * region adds a keyboard stop with no action of its own, which the WAI-ARIA
   * carousel pattern avoids (see `tabIndex`/event-listener guidance for
   * non-interactive elements).
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  const carouselRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    node.addEventListener('keydown', handleKeyDown);
    return () => node.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      ref={carouselRef}
      className='space-y-8'
      aria-roledescription='carousel'
      aria-label='Testimonials'
    >
      <div className='relative px-0 md:px-12 lg:px-20'>
        {testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              aria-disabled={isAnimating}
              aria-label='Previous testimonial'
              className={clsx(
                'absolute left-0 -translate-x-1/2 md:-translate-x-0 top-1/2 -translate-y-1/2 z-20',
                'p-2.5 md:p-3.5 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center',
                'bg-zinc-900/95 backdrop-blur-md border border-zinc-700',
                'hover:bg-zinc-800 hover:border-secondary-500/60 hover:shadow-lg hover:shadow-secondary-500/20',
                'active:scale-90',
                'transition-all duration-300 ease-out',
                // `aria-disabled` (not `disabled`): the handlers already ignore
                // input while animating, and disabling a focused control would
                // drop the keyboard focus the arrow keys rely on.
                'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:scale-100',
                'group shadow-lg md:shadow-xl'
              )}
            >
              <ChevronLeft
                size={16}
                className='md:w-5 md:h-5 text-zinc-200 group-hover:text-secondary-400 group-hover:scale-110 transition-all duration-300'
                aria-hidden='true'
              />
            </button>

            <button
              onClick={goToNext}
              aria-disabled={isAnimating}
              aria-label='Next testimonial'
              className={clsx(
                'absolute right-0 translate-x-1/2 md:translate-x-0 top-1/2 -translate-y-1/2 z-20',
                'p-2.5 md:p-3.5 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center',
                'bg-zinc-900/95 backdrop-blur-md border border-zinc-700',
                'hover:bg-zinc-800 hover:border-secondary-500/60 hover:shadow-lg hover:shadow-secondary-500/20',
                'active:scale-90',
                'transition-all duration-300 ease-out',
                'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:scale-100',
                'group shadow-lg md:shadow-xl'
              )}
            >
              <ChevronRight
                size={16}
                className='md:w-5 md:h-5 text-zinc-200 group-hover:text-secondary-400 group-hover:scale-110 transition-all duration-300'
                aria-hidden='true'
              />
            </button>
          </>
        )}

        <section
          aria-roledescription='slide'
          aria-label={`Testimonial ${displayedIndex + 1} of ${testimonials.length}`}
          aria-live='polite'
          aria-atomic='true'
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
          {currentTestimonial && (
            <TestimonialCard
              key={currentTestimonial.id}
              author={currentTestimonial.author}
              content={currentTestimonial.content}
              excerpt={currentTestimonial.excerpt}
              date={currentTestimonial.date}
              index={displayedIndex}
              variant='carousel'
              totalCount={testimonials.length}
            />
          )}
        </section>
      </div>

      {testimonials.length > 1 && (
        <div className='flex justify-center items-center gap-1 md:gap-2 mt-4 md:mt-6'>
          {testimonials.map((testimonial, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={testimonial?.id ?? `testimonial-${index}`}
                onClick={() => goToSlide(index)}
                aria-disabled={isAnimating}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={clsx(
                  'flex h-11 w-11 items-center justify-center rounded-full transition-opacity duration-300',
                  FOCUS_RING_CLASSES,
                  'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed'
                )}
              >
                <span
                  aria-hidden='true'
                  className={clsx(
                    'rounded-full transition-all duration-300',
                    isActive
                      ? 'h-2 w-8 md:h-2.5 md:w-10 bg-primary-500 shadow-lg shadow-primary-500/50'
                      : 'h-2 w-2 md:h-2.5 md:w-2.5 bg-zinc-700 hover:bg-secondary-500/70'
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TestimonialsCarousel;
