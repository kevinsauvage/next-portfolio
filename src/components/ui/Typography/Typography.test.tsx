import { H2 } from './H2';
import { GRADIENT_TEXT, headingColor } from './typography';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('headingColor', () => {
  it('returns the gradient classes only when asked', () => {
    expect(headingColor(true)).toBe(GRADIENT_TEXT);
    expect(headingColor(false)).toBe('text-zinc-50');
  });
});

describe('H2', () => {
  it('applies the gradient text when gradient is set', () => {
    render(<H2 gradient>Title</H2>);

    expect(screen.getByRole('heading', { level: 2 }).className).toContain('bg-clip-text');
  });

  it('renders solid by default', () => {
    render(<H2>Title</H2>);

    expect(screen.getByRole('heading', { level: 2 }).className).toContain('text-zinc-50');
  });
});
