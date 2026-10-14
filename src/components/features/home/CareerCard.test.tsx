import CareerCard from './CareerCard';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('CareerCard', () => {
  it('renders the role, every highlight and the skills', () => {
    render(
      <CareerCard
        company='Acme'
        position='Engineer'
        period='2024 – 2025'
        highlights={['Shipped A', 'Shipped B']}
        skills={['React', 'TypeScript']}
        index={0}
      />
    );

    expect(screen.getByRole('heading', { name: 'Acme' })).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Shipped A')).toBeInTheDocument();
    expect(screen.getByText('Shipped B')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
