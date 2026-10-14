import PassionCard from './PassionCard';

import { render, screen } from '@testing-library/react';
import { CheckCircle } from 'lucide-react';
import { describe, expect, it } from 'vitest';

describe('PassionCard', () => {
  it('renders the title, description and icon', () => {
    const { container } = render(
      <PassionCard
        icon={CheckCircle}
        title='Driving Impact'
        description='Building useful things.'
      />
    );

    expect(screen.getByRole('heading', { name: 'Driving Impact' })).toBeDefined();
    expect(screen.getByText('Building useful things.')).toBeDefined();
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
