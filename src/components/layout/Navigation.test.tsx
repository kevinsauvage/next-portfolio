import Navigation from './Navigation';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Navigation', () => {
  it('links to homepage sections with root-relative hrefs', () => {
    render(<Navigation />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/#/);
    }
  });
});
