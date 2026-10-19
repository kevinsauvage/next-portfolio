import TestimonialCard from './TestimonialCard';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const props = {
  author: { name: 'Jane Doe', title: 'CTO', company: 'Acme', relationship: 'Manager' },
  content: 'The full recommendation text.',
  date: 'September 2025',
  excerpt: 'Short excerpt.',
  index: 0,
  totalCount: 3,
};

describe('TestimonialCard', () => {
  it('shows the excerpt first and the full text after expanding', () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByText(/Short excerpt\./)).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: /read full/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);

    expect(screen.getByText(/The full recommendation text\./)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show less/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('clamps the excerpt but never the expanded text', () => {
    render(<TestimonialCard {...props} />);
    const quote = () => screen.getByText(/Short excerpt\.|The full recommendation text\./);

    expect(quote()).toHaveClass('line-clamp-6');
    fireEvent.click(screen.getByRole('button', { name: /read full/i }));
    expect(quote()).not.toHaveClass('line-clamp-6');
  });

  it('shows the position out of the total and a valid machine-readable date', () => {
    const { container } = render(<TestimonialCard {...props} />);

    expect(screen.getByText('01 / 03')).toBeInTheDocument();
    expect(container.querySelector('time')).toHaveAttribute('datetime', '2025-09');
  });

  it('shows initials for the author', () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
