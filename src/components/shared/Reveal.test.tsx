import Reveal from './Reveal';

import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('Reveal', () => {
  afterEach(() => {
    vi.mocked(window.matchMedia).mockImplementation(
      (query: string) => ({ matches: false, media: query }) as MediaQueryList
    );
  });

  it('starts hidden until it intersects the viewport', () => {
    render(<Reveal>content</Reveal>);
    expect(screen.getByText('content')).not.toHaveClass('is-visible');
  });

  it('renders visible immediately when reduced motion is preferred', () => {
    vi.mocked(window.matchMedia).mockImplementation(
      (query: string) => ({ matches: true, media: query }) as MediaQueryList
    );
    render(<Reveal>content</Reveal>);
    expect(screen.getByText('content')).toHaveClass('is-visible');
  });

  it('applies the stagger delay', () => {
    render(<Reveal delay={300}>content</Reveal>);
    expect(screen.getByText('content')).toHaveStyle({ transitionDelay: '300ms' });
  });
});
