import { checkRateLimit, resetRateLimit } from './rate-limit';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('checkRateLimit (in-memory fallback)', () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it('allows requests up to the limit and then blocks with a retry hint', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await expect(checkRateLimit('client')).resolves.toEqual({
        allowed: true,
        retryAfterSeconds: 0,
      });
    }

    const blocked = await checkRateLimit('client');

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('honours a custom max and window per key', async () => {
    const options = { max: 2, windowMs: 30_000 };

    expect(await checkRateLimit('scoped', options)).toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
    expect(await checkRateLimit('scoped', options)).toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
    expect((await checkRateLimit('scoped', options)).allowed).toBe(false);
  });

  it('isolates counters between keys', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) await checkRateLimit('busy');

    await expect(checkRateLimit('quiet')).resolves.toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
  });
});

describe('checkRateLimit (Upstash)', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    resetRateLimit();
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://example.upstash.io');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'test-token');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const redisResponse = (count: number, ttlMs: number) => ({
    json: async () => [{ result: 'OK' }, { result: count }, { result: ttlMs }],
    ok: true,
  });

  it('counts through the Redis pipeline and allows under the limit', async () => {
    fetchMock.mockResolvedValue(redisResponse(1, 59_000));

    const result = await checkRateLimit('client');

    expect(result).toEqual({ allowed: true, retryAfterSeconds: 0 });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.upstash.io/pipeline',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('blocks when the Redis counter exceeds the limit', async () => {
    fetchMock.mockResolvedValue(redisResponse(6, 30_000));

    const result = await checkRateLimit('client');

    expect(result).toEqual({ allowed: false, retryAfterSeconds: 30 });
  });

  it('falls back to the in-memory window when Redis is unreachable', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchMock.mockRejectedValue(new Error('redis down'));

    try {
      await expect(checkRateLimit('client')).resolves.toEqual({
        allowed: true,
        retryAfterSeconds: 0,
      });
      expect(consoleError).toHaveBeenCalled();
    } finally {
      consoleError.mockRestore();
    }
  });
});
