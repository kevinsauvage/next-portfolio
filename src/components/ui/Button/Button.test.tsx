import Button from '../Button';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label='Click me' />);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button label='Disabled' disabled />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('disabled')).toBe('');
  });

  it('shows loading state', () => {
    render(<Button label='Submit' loading />);
    expect(screen.getByRole('button').getAttribute('disabled')).toBe('');
  });

  it('applies variant classes', () => {
    render(<Button label='Primary' variant='primary' />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gradient-to-br');
  });
});
