import AccessibilityStatement from './AccessibilityStatement';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

describe('AccessibilityStatement', () => {
  it('states the compliance status and offers a contact, without violations', async () => {
    const { container } = render(<AccessibilityStatement />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Accessibility statement' })
    ).toBeInTheDocument();
    expect(screen.getByText('Compliance status')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /kevinsauvage@outlook\.com/ })).toHaveAttribute(
      'href',
      'mailto:kevinsauvage@outlook.com'
    );
    expect(
      screen.getAllByRole('link', { name: /Défenseur des droits.*\(opens in a new tab\)/ })
    ).toHaveLength(2);

    expect(await axe(container)).toHaveNoViolations();
  });
});
