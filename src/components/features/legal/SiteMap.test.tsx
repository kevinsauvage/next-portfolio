import { projects } from '@/config/content';

import SiteMap from './SiteMap';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

describe('SiteMap', () => {
  it('links every page and home section, without violations', async () => {
    const { container } = render(<SiteMap />);
    const nav = screen.getByRole('navigation', { name: 'Site map' });

    expect(nav.querySelector('a[href="/#about"]')).not.toBeNull();
    for (const { slug } of projects) {
      expect(nav.querySelector(`a[href="/projects/${slug}"]`)).not.toBeNull();
    }
    expect(screen.getByRole('link', { name: 'Site map' })).toHaveAttribute('aria-current', 'page');

    expect(await axe(container)).toHaveNoViolations();
  });
});
