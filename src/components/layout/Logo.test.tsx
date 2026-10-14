import Logo from './Logo';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Logo', () => {
  it('links home and carries the person name', () => {
    render(<Logo />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('data-analytics-event', 'nav_logo_click');
    expect(link.textContent).toContain('Kévin Sauvage');
  });
});
