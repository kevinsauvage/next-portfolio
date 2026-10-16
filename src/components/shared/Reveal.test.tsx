import Reveal from './Reveal';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Reveal', () => {
  it('renders markup the observer can drive, hidden until revealed', () => {
    render(<Reveal>content</Reveal>);

    const element = screen.getByText('content');
    expect(element).toHaveClass('reveal');
    expect(element).not.toHaveClass('is-visible');
  });

  it('applies the stagger delay', () => {
    render(<Reveal delay={300}>content</Reveal>);

    expect(screen.getByText('content')).toHaveStyle({ transitionDelay: '300ms' });
  });

  it('renders as the requested element', () => {
    render(<Reveal as='section'>content</Reveal>);

    expect(screen.getByText('content').tagName).toBe('SECTION');
  });
});
