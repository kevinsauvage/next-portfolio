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

  it('lets long words wrap inside the card instead of being clipped at 200% text', () => {
    render(<Card data-testid='card'>Body</Card>);

    // The card clips its overflow, so its content must be allowed to wrap anywhere.
    expect(screen.getByTestId('card').lastElementChild).toHaveClass('[overflow-wrap:anywhere]');
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
