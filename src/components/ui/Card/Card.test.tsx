import { Card } from './Card';
import { CardContent } from './CardContent';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Card', () => {
  it('adds the entrance animation and staggered delay when indexed', () => {
    render(
      <Card animationIndex={2} data-testid='card'>
        Body
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card.className).toContain('card-enter');
    expect(card.style.animationDelay).toBe('200ms');
  });

  it('omits the entrance animation without an index', () => {
    render(<Card data-testid='card'>Body</Card>);

    expect(screen.getByTestId('card').className).not.toContain('card-enter');
  });
});

describe('CardContent', () => {
  it('applies the vertical rhythm for the requested spacing', () => {
    render(<CardContent spacing='lg'>Body</CardContent>);

    expect(screen.getByText('Body').className).toContain('space-y-6');
  });
});
