import BackToTopButton from './BackToTopButton';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('BackToTopButton', () => {
  it('scrolls to the top and moves focus to the first element of the page', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    const scrollTo = vi.spyOn(window, 'scrollTo').mockReturnValue();

    render(
      <>
        <a id='skip-link' href='#main-content'>
          Skip to main content
        </a>
        <BackToTopButton />
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Back to top', hidden: true }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveFocus();

    vi.unstubAllGlobals();
    scrollTo.mockRestore();
  });
});
