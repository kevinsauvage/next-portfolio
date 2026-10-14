import FaqItem from './FaqItem';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('FaqItem', () => {
  it('expands and collapses, keeping the panel out of the a11y tree when closed', () => {
    render(<FaqItem id='stack' index={0} question='Core stack?' answer='React and TypeScript.' />);

    const button = screen.getByRole('button', { name: /core stack\?/i });
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId ?? '') as HTMLElement;

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('inert');

    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('inert');
  });
});
