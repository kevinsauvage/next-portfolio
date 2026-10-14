import EmailCopyButton from './EmailCopyButton';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { toastError } = vi.hoisted(() => ({ toastError: vi.fn() }));

vi.mock('sonner', () => ({ toast: { error: toastError } }));

const writeText = vi.fn();

const setClipboard = (value: unknown) => {
  Object.defineProperty(globalThis.navigator, 'clipboard', { configurable: true, value });
};

describe('EmailCopyButton', () => {
  beforeEach(() => {
    writeText.mockReset();
    toastError.mockReset();
    setClipboard({ writeText });
  });

  afterEach(() => {
    Reflect.deleteProperty(globalThis.navigator as unknown as Record<string, unknown>, 'clipboard');
  });

  it('copies the address and confirms to the user', async () => {
    writeText.mockResolvedValue(undefined);
    render(<EmailCopyButton email='me@example.com' />);

    fireEvent.click(screen.getByRole('button'));

    expect(writeText).toHaveBeenCalledWith('me@example.com');
    await waitFor(() => expect(screen.getByText('Copied')).toBeDefined());
    expect(toastError).not.toHaveBeenCalled();
  });

  it('reports an error when both copy paths fail', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    render(<EmailCopyButton email='me@example.com' />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(toastError).toHaveBeenCalledTimes(1));
  });
});
