import 'server-only';

/**
 * Minimal in-memory fixed-window rate limiter for the public contact action.
 *
 * Scope: best-effort abuse protection on a single serverless instance. It is
 * intentionally boring — no Redis/KV dependency — and resets on cold start.
 * That is enough to stop naive form-spam loops while reCAPTCHA remains the
 * primary gate. Swap the store for Vercel KV if protection must be global.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_KEYS = 10_000;

type WindowEntry = {
  count: number;
  resetAt: number;
};

const windows = new Map<string, WindowEntry>();

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

function pruneExpired(now: number): void {
  for (const [key, entry] of windows) {
    if (entry.resetAt <= now) windows.delete(key);
  }
}

export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  if (windows.size > MAX_TRACKED_KEYS) pruneExpired(now);

  const existing = windows.get(key);
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test-only: clears tracked windows between cases. */
export function resetRateLimit(): void {
  windows.clear();
}
