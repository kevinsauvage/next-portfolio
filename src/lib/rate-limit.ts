import 'server-only';

/**
 * Abuse protection for the public contact action.
 *
 * Counters live in Upstash Redis (through its REST API) when the deployment
 * provides credentials, so a window holds across serverless instances and
 * survives cold starts. Without credentials — or if Redis is unreachable — it
 * degrades to a best-effort in-memory window. reCAPTCHA stays the primary gate.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_KEYS = 10_000;

type WindowEntry = {
  count: number;
  resetAt: number;
};

type RedisConfig = {
  token: string;
  url: string;
};

type RedisCommandResponse = { error?: string; result?: unknown };

const windows = new Map<string, WindowEntry>();

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export type RateLimitOptions = {
  max?: number;
  windowMs?: number;
};

function pruneExpired(now: number): void {
  for (const [key, entry] of windows) {
    if (entry.resetAt <= now) windows.delete(key);
  }
}

function checkInMemory(key: string, max: number, windowMs: number, now: number): RateLimitResult {
  if (windows.size > MAX_TRACKED_KEYS) pruneExpired(now);

  const existing = windows.get(key);
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function getRedisConfig(): RedisConfig | null {
  const url = process.env['UPSTASH_REDIS_REST_URL'] ?? process.env['KV_REST_API_URL'];
  const token = process.env['UPSTASH_REDIS_REST_TOKEN'] ?? process.env['KV_REST_API_TOKEN'];
  return url && token ? { token, url } : null;
}

/**
 * Atomic-enough fixed window: `SET ... NX` seeds the window, then `INCR` counts
 * and `PTTL` reports the remaining time — one round trip, no read-modify-write.
 */
async function checkRedis(
  config: RedisConfig,
  key: string,
  max: number,
  windowMs: number
): Promise<RateLimitResult> {
  const response = await fetch(`${config.url}/pipeline`, {
    body: JSON.stringify([
      ['SET', key, '0', 'PX', windowMs, 'NX'],
      ['INCR', key],
      ['PTTL', key],
    ]),
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Upstash request failed with status ${response.status}`);
  }

  const results = (await response.json()) as RedisCommandResponse[];
  const count = Number(results[1]?.result ?? 0);
  const ttlMs = Number(results[2]?.result ?? windowMs);
  if (count > max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(ttlMs / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Consumes one slot for `key`. Durable when Upstash is configured, otherwise
 * in-memory. Never throws: a Redis failure degrades to the local window.
 */
export async function checkRateLimit(
  key: string,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const { max = MAX_REQUESTS_PER_WINDOW, windowMs = WINDOW_MS } = options;
  const config = getRedisConfig();
  if (config) {
    try {
      return await checkRedis(config, key, max, windowMs);
    } catch (error) {
      console.error('Rate limit store unavailable; falling back to in-memory', error);
    }
  }
  return checkInMemory(key, max, windowMs, Date.now());
}

/** Test-only: clears tracked windows between cases. */
export function resetRateLimit(): void {
  windows.clear();
}
