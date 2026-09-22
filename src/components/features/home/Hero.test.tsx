import Hero from './Hero';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }));

describe('Hero', () => {
  it('links the primary CTA to the career section', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: /see impact/i })).toHaveAttribute('href', '/#career');
  });

  it('opens the resume in a new tab', () => {
    render(<Hero />);

    const resume = screen.getByRole('link', { name: /resume/i });

    expect(resume).toHaveAttribute('href', '/kevin_sauvage_resume.pdf');
    expect(resume).toHaveAttribute('target', '_blank');
    expect(resume.getAttribute('rel')).toContain('noopener');
  });
});
