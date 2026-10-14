import ButtonLink from './ButtonLink';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ButtonLink', () => {
  it('renders a link named by its label', () => {
    render(<ButtonLink href='/x' label='Go' />);
    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/x');
  });

  it('emits delegated analytics attributes for the event and its properties', () => {
    render(
      <ButtonLink
        href='/x'
        label='Go'
        eventName='cta_resume_click'
        eventProperties={{ link_type: 'live', project_slug: 'demo' }}
      />
    );

    const link = screen.getByRole('link', { name: 'Go' });
    expect(link).toHaveAttribute('data-analytics-event', 'cta_resume_click');
    expect(link).toHaveAttribute('data-analytics-link-type', 'live');
    expect(link).toHaveAttribute('data-analytics-project-slug', 'demo');
  });

  it('adds no analytics attributes without an event name', () => {
    render(<ButtonLink href='/x' label='Go' eventProperties={{ a: 'b' }} />);
    expect(screen.getByRole('link', { name: 'Go' })).not.toHaveAttribute('data-analytics-event');
  });
});
