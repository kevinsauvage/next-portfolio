import FormError from './FormError';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('FormError', () => {
  it('renders the message without announcing itself', () => {
    render(<FormError id='fullName-error' message='Full name is required' />);

    // The owning form provides a single live region, so the inline error must
    // not be a second assertive `role="alert"`.
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Full name is required')).toBeDefined();
  });

  it('links its id for aria-describedby', () => {
    render(<FormError id='email-error' message='Invalid' />);

    expect(screen.getByText('Invalid').closest('#email-error')).not.toBeNull();
  });
});
