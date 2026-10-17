import { TOAST_REQUESTED_EVENT } from '@/lib/notify';

import SonnerToasterLoader from './SonnerToasterLoader';

import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/components/shared/SonnerToaster', () => ({
  default: () => <div data-testid='toaster' />,
}));

describe('SonnerToasterLoader', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does not render the toaster until a toast is requested', () => {
    render(<SonnerToasterLoader />);

    expect(screen.queryByTestId('toaster')).not.toBeInTheDocument();
  });

  it('mounts the toaster when a toast is requested', async () => {
    render(<SonnerToasterLoader />);

    act(() => {
      window.dispatchEvent(new Event(TOAST_REQUESTED_EVENT));
    });

    expect(await screen.findByTestId('toaster')).toBeInTheDocument();
  });
});
