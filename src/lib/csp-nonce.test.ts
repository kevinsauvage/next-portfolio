import { afterEach, describe, expect, it, vi } from 'vitest';

const { headersMock } = vi.hoisted(() => ({ headersMock: vi.fn() }));

vi.mock('next/headers', () => ({ headers: headersMock }));

const load = async () => {
  vi.resetModules();
  return (await import('./csp-nonce')).getNonce;
};

describe('getNonce', () => {
  afterEach(() => {
    headersMock.mockReset();
  });

  it('returns the per-request x-nonce header', async () => {
    headersMock.mockResolvedValue(new Headers({ 'x-nonce': 'abc123' }));

    await expect((await load())()).resolves.toBe('abc123');
  });

  it('returns undefined when the header is absent', async () => {
    headersMock.mockResolvedValue(new Headers());

    await expect((await load())()).resolves.toBeUndefined();
  });
});
