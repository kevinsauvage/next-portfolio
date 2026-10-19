import testimonials from '@/config/content/testimonials';

import TestimonialsCarousel from './TestimonialsCarousel';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }));

const [first, second] = testimonials as [
  (typeof testimonials)[number],
  (typeof testimonials)[number],
];
const excerptText = (value: string) => `"${value}"`;

const settleAnimation = () => {
  act(() => {
    vi.advanceTimersByTime(500);
  });
};

describe('TestimonialsCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps the pagination dots visible in forced-colors mode', () => {
    render(<TestimonialsCarousel testimonials={testimonials} />);

    // A dot is only a background color, which forced colors removes: each one
    // needs a border (jsdom cannot evaluate the media query, so assert the class).
    const dots = screen.getAllByRole('button', { name: /go to testimonial/i });
    expect(dots.length).toBeGreaterThan(1);
    for (const dot of dots) {
      expect(dot.firstElementChild).toHaveClass('forced-colors:border');
    }
  });

  it('advances to the next testimonial with the arrow button', () => {
    render(<TestimonialsCarousel testimonials={testimonials} />);
    expect(screen.getByText(excerptText(first.excerpt))).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /next testimonial/i }));
    settleAnimation();

    expect(screen.getByText(excerptText(second.excerpt))).toBeInTheDocument();
  });

  it('responds to ArrowRight and ArrowLeft keyboard navigation', () => {
    render(<TestimonialsCarousel testimonials={testimonials} />);
    const carousel = screen.getByRole('region', { name: /testimonials/i });

    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    settleAnimation();
    expect(screen.getByText(excerptText(second.excerpt))).toBeInTheDocument();

    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    settleAnimation();
    expect(screen.getByText(excerptText(first.excerpt))).toBeInTheDocument();
  });
});
