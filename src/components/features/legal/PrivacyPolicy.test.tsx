import { cookies, privacy, sections } from '@/config/content';

import PrivacyPolicy from './PrivacyPolicy';

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

/**
 * The page is rendered in isolation, so the landmark rule that expects the
 * surrounding `<main>`/`<header>` chrome from `app/layout.tsx` is disabled.
 * ARIA, table semantics, heading order and labelling rules stay on.
 */
const axeOptions = {
  rules: {
    region: { enabled: false },
  },
};

describe('PrivacyPolicy', () => {
  it('renders the title, intro and a machine-readable last-updated date', () => {
    const { container } = render(<PrivacyPolicy />);

    expect(screen.getByRole('heading', { level: 1, name: privacy.title })).toBeInTheDocument();
    expect(screen.getByText(privacy.intro)).toBeInTheDocument();
    expect(container.querySelector('time')).toHaveAttribute('datetime', privacy.lastUpdated);
  });

  it('anchors every section from the table of contents with a matching heading', () => {
    render(<PrivacyPolicy />);

    for (const section of privacy.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: section.shortTitle })).toHaveAttribute(
        'href',
        `#${section.id}`
      );
    }
  });

  it('documents every consent category the banner offers', () => {
    render(<PrivacyPolicy />);

    const table = screen.getByRole('table', { name: privacy.cookieTableCaption });

    for (const category of cookies.preferences.categories) {
      expect(within(table).getByRole('rowheader', { name: category.title })).toBeInTheDocument();
    }
    expect(
      within(table).getByRole('rowheader', { name: 'Strictly necessary' })
    ).toBeInTheDocument();
    expect(within(table).getAllByText(cookies.preferences.required).length).toBeGreaterThan(0);
  });

  it('links the controller email and keeps the cookie settings reachable', () => {
    render(<PrivacyPolicy />);

    const emailLinks = screen.getAllByRole('link', { name: sections.contact.email });
    expect(emailLinks.length).toBeGreaterThan(0);
    for (const link of emailLinks) {
      expect(link).toHaveAttribute('href', `mailto:${sections.contact.email}`);
    }
    expect(screen.getByRole('button', { name: cookies.settingsTrigger })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PrivacyPolicy />);

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
