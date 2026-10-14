import Header from './Header';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Header', () => {
  it('renders the primary navigation and a resume CTA tagged for analytics', () => {
    render(<Header />);

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeDefined();

    const headerResume = screen
      .getAllByRole('link', { name: /resume/i })
      .find(link => link.getAttribute('data-analytics-location') === 'header');

    expect(headerResume).toHaveAttribute('href', '/kevin_sauvage_resume.pdf');
    expect(headerResume).toHaveAttribute('data-analytics-event', 'cta_resume_click');
  });
});
