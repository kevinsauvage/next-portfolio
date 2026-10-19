import { notifyError, notifySuccess } from './index';

import { waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

/** Counts evaluations of the sonner module; it must stay lazy until used. */
const sonner = vi.hoisted(() => ({ evaluations: 0, error: vi.fn(), success: vi.fn() }));

vi.mock('sonner', () => {
  sonner.evaluations += 1;
  return { toast: { error: sonner.error, success: sonner.success } };
});

describe('notify', () => {
  it('does not load sonner on import', () => {
    expect(sonner.evaluations).toBe(0);
  });

  it('loads sonner and forwards an error', async () => {
    notifyError('boom');

    await waitFor(() => expect(sonner.error).toHaveBeenCalledWith('boom'));
    expect(sonner.success).not.toHaveBeenCalled();
  });

  it('loads sonner and forwards a success', async () => {
    notifySuccess('sent');

    await waitFor(() => expect(sonner.success).toHaveBeenCalledWith('sent'));
  });
});
