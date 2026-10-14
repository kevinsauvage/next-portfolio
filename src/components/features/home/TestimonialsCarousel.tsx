'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import TestimonialCard from '@/components/features/home/TestimonialCard';
import { FOCUS_RING_SECONDARY } from '@/components/ui/focusRing';
import type { Testimonial } from '@/config/content/testimonials';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

const ANIMATION_DURATION = 400;
const ANIMATION_RESET_DELAY = 50;

type ArrowButtonProps = {
  side: 'left' | 'right';
  label: string;
  disabled: boolean;
  onClick: () => void;
};

const ArrowButton = ({ side, label, disabled, onClick }: ArrowButtonProps) => {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      aria-disabled={disabled}
      aria-label={label}
      className={clsx(
        'absolute top-1/2 -translate-y-1/2 z-20',
        side === 'left'
          ? 'left-0 -translate-x-1/2 md:-translate-x-0'
          : 'right-0 translate-x-1/2 md:translate-x-0',
        'p-2.5 md:p-3.5 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center',
        'bg-zinc-900/95 backdrop-blur-md border border-zinc-700',
        'hover:bg-zinc-800 hover:border-secondary-500/60 hover:shadow-lg hover:shadow-secondary-500/20',
        'active:scale-90 active:duration-100',
        'transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out',
        // `aria-disabled` (not `disabled`): the handlers already ignore input while
        // animating, and disabling a focused control would drop the keyboard focus
        // the arrow keys rely on.
        'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:scale-100',
        'group shadow-lg md:shadow-xl'
      )}
    >
      <Icon
        size={16}
        className='md:w-5 md:h-5 text-zinc-200 group-hover:text-secondary-400 group-hover:scale-110 transition-[transform,color] duration-200'
        aria-hidden='true'
      />
    </button>
  );
};

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const schedule = useCallback((callback: () => void, delay: number) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      callback();
    }, delay);
    timers.current.add(id);
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const id of pending) clearTimeout(id);
      pending.clear();
    };
  }, []);

  /** Fades the slide out, swaps the index, then fades back in. */
  const navigate = useCallback(
    (target: number, slideDirection: 'left' | 'right') => {
      setDirection(slideDirection);
      setIsAnimating(true);
      schedule(() => {
        setIndex(target);
        schedule(() => setIsAnimating(false), ANIMATION_RESET_DELAY);
      }, ANIMATION_DURATION);
    },
    [schedule]
  );

  const goToSlide = useCallback(
    (target: number) => {
      if (target === index || isAnimating) return;
      if (target < 0 || target >= testimonials.length) return;
      trackEvent(ANALYTICS_EVENTS.TESTIMONIALS_CAROUSEL_DOT, { index: String(target) });
      navigate(target, target > index ? 'right' : 'left');
    },
    [index, isAnimating, navigate, testimonials.length]
  );

  const step = useCallback(
    (offset: 1 | -1) => {
      if (isAnimating) return;
      trackEvent(ANALYTICS_EVENTS.TESTIMONIALS_CAROUSEL_ARROW, {
        direction: offset === 1 ? 'next' : 'prev',
      });
      navigate(
        (index + offset + testimonials.length) % testimonials.length,
        offset === 1 ? 'right' : 'left'
      );
    },
    [index, isAnimating, navigate, testimonials.length]
  );

  const goToPrevious = useCallback(() => step(-1), [step]);
  const goToNext = useCallback(() => step(1), [step]);

  const currentTestimonial = testimonials.at(index) ?? null;

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
            <ArrowButton
              side='left'
              label='Previous testimonial'
              disabled={isAnimating}
              onClick={goToPrevious}
            />
            <ArrowButton
              side='right'
              label='Next testimonial'
              disabled={isAnimating}
              onClick={goToNext}
            />
          </>
        )}

        <section
          aria-roledescription='slide'
          aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
          aria-live='polite'
          aria-atomic='true'
          className={clsx(
            'relative transition-[opacity,transform] duration-[400ms] ease-out',
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
              index={index}
              totalCount={testimonials.length}
            />
          )}
        </section>
      </div>

      {testimonials.length > 1 && (
        <div className='flex justify-center items-center gap-1 md:gap-2 mt-4 md:mt-6'>
          {testimonials.map((testimonial, slideIndex) => {
            const isActive = slideIndex === index;
            return (
              <button
                key={testimonial?.id ?? `testimonial-${slideIndex}`}
                onClick={() => goToSlide(slideIndex)}
                aria-disabled={isAnimating}
                aria-label={`Go to testimonial ${slideIndex + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={clsx(
                  'flex h-11 w-11 items-center justify-center rounded-full transition-opacity duration-300',
                  FOCUS_RING_SECONDARY,
                  'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed'
                )}
              >
                <span
                  aria-hidden='true'
                  className={clsx(
                    'rounded-full transition-[width,background-color,box-shadow] duration-200',
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
