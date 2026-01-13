'use client';

import { useCallback, useState } from 'react';

import TestimonialCard from '@/components/features/home/TestimonialCard';
import { colors, gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

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
      <div className='relative px-0 md:px-12 lg:px-20'>
        {testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              aria-label='Previous testimonial'
              tabIndex={-1}
              className={clsx(
                'absolute left-0 -translate-x-1/2 md:-translate-x-0 top-1/2 -translate-y-1/2 z-20',
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
                'absolute right-0 translate-x-1/2 md:translate-x-0 top-1/2 -translate-y-1/2 z-20',
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
          {currentTestimonial && (
            <TestimonialCard
              author={currentTestimonial.author}
              content={currentTestimonial.content}
              date={currentTestimonial.date}
              index={displayedIndex}
              variant='carousel'
              totalCount={testimonials.length}
            />
          )}
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
