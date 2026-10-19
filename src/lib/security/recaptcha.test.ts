import { getRecaptchaToken, RecaptchaUnavailableError } from './recaptcha';

import { afterEach, describe, expect, it, vi } from 'vitest';

type GrecaptchaStub = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

const setGrecaptcha = (stub: GrecaptchaStub | undefined) => {
  const target = globalThis as { grecaptcha?: GrecaptchaStub };
  if (stub === undefined) {
    delete target.grecaptcha;
  } else {
    target.grecaptcha = stub;
  }
};

describe('getRecaptchaToken', () => {
  afterEach(() => {
    setGrecaptcha(undefined);
  });

  it('rejects with RecaptchaUnavailableError before the script has loaded', async () => {
    setGrecaptcha(undefined);

    await expect(getRecaptchaToken('key', 'submit')).rejects.toBeInstanceOf(
      RecaptchaUnavailableError
    );
  });

  it('waits for ready and then executes the action', async () => {
    const execute = vi.fn(() => Promise.resolve('token'));
    let onReady: (() => void) | undefined;
    setGrecaptcha({
      ready: callback => {
        onReady = callback;
      },
      execute,
    });

    const pending = getRecaptchaToken('my-key', 'submit');
    // reCAPTCHA must not be asked for a token before `ready` fires.
    expect(execute).not.toHaveBeenCalled();

    onReady?.();

    await expect(pending).resolves.toBe('token');
    expect(execute).toHaveBeenCalledWith('my-key', { action: 'submit' });
  });

  it('propagates an execution failure', async () => {
    const failure = new Error('network');
    setGrecaptcha({
      ready: callback => callback(),
      execute: () => Promise.reject(failure),
    });

    await expect(getRecaptchaToken('key', 'submit')).rejects.toBe(failure);
  });
});
