import MobileMenuToggle from './MobileMenuToggle';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// jsdom has no modal <dialog> support; emulate the open state it controls.
const showModal = vi.fn(function (this: HTMLDialogElement) {
  this.setAttribute('open', '');
});
const close = vi.fn(function (this: HTMLDialogElement) {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
});

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }));

const OPEN_MENU = /open menu/i;
const ARIA_EXPANDED = 'aria-expanded';

describe('MobileMenuToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
    HTMLDialogElement.prototype.showModal = showModal;
    HTMLDialogElement.prototype.close = close;
  });

  it('opens the modal dialog and locks body scroll', () => {
    render(<MobileMenuToggle />);
    const toggle = screen.getByRole('button', { name: OPEN_MENU });
    expect(toggle).toHaveAttribute(ARIA_EXPANDED, 'false');

    fireEvent.click(toggle);

    expect(showModal).toHaveBeenCalledTimes(1);
    expect(document.body.style.overflow).toBe('hidden');
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      ARIA_EXPANDED,
      'true'
    );
  });

  it('restores scroll and state when the dialog closes (e.g. Escape)', () => {
    render(<MobileMenuToggle />);
    fireEvent.click(screen.getByRole('button', { name: OPEN_MENU }));

    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    fireEvent(dialog, new Event('close'));

    expect(document.body.style.overflow).toBe('');
    expect(screen.getByRole('button', { name: OPEN_MENU })).toHaveAttribute(ARIA_EXPANDED, 'false');
  });

  it('closes when the backdrop (the dialog element itself) is clicked', () => {
    render(<MobileMenuToggle />);
    fireEvent.click(screen.getByRole('button', { name: OPEN_MENU }));

    fireEvent.click(document.querySelector('dialog') as HTMLDialogElement);

    expect(close).toHaveBeenCalled();
  });
});
