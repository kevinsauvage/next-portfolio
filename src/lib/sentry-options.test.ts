import { parseSampleRate, sentryOptions } from './sentry-options';

import { describe, expect, it } from 'vitest';

describe('parseSampleRate', () => {
  it('uses a valid 0–1 value', () => {
    expect(parseSampleRate('0.5')).toBe(0.5);
    expect(parseSampleRate('0')).toBe(0);
  });

  it('falls back to 0.1 when unset, empty, non-numeric or out of range', () => {
    for (const value of [undefined, '', 'abc', '2', '-1']) {
      expect(parseSampleRate(value)).toBe(0.1);
    }
  });
});

describe('sentryOptions', () => {
  it('never collects user info or request bodies', () => {
    const options = sentryOptions(0.2);

    expect(options.tracesSampleRate).toBe(0.2);
    expect(options.dataCollection).toEqual({ userInfo: false, httpBodies: [] });
  });
});
