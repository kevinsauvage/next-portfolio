import { flushUmamiQueue, getUmamiScriptProps, sanitizeEventData, trackEvent } from './analytics';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function setNodeEnv(value: string) {
  vi.stubEnv('NODE_ENV', value);
}

function setDevOptIn(value: string | undefined) {
  if (value === undefined) {
    vi.stubEnv('NEXT_PUBLIC_UMAMI_ENABLE_IN_DEV', '');
  } else {
    vi.stubEnv('NEXT_PUBLIC_UMAMI_ENABLE_IN_DEV', value);
  }
}

function setDoNotTrack(value: string | undefined) {
  Object.defineProperty(globalThis.window.navigator, 'doNotTrack', {
    value,
    configurable: true,
  });
}

function installTracker() {
  const track = vi.fn();
  globalThis.window.umami = { track };
  return { track };
}

beforeEach(() => {
  // Drain any events queued by a previous case.
  delete globalThis.window.umami;
  flushUmamiQueue();
  setNodeEnv('production');
  setDevOptIn(undefined);
  setDoNotTrack(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  delete globalThis.window.umami;
});

describe('sanitizeEventData', () => {
  it('returns empty object for missing input', () => {
    expect(sanitizeEventData()).toEqual({});
  });

  it('truncates strings to 500 chars', () => {
    const result = sanitizeEventData({ message: 'a'.repeat(600) });
    expect(result['message']).toHaveLength(500);
  });

  it('rounds numbers to 4 decimal places', () => {
    expect(sanitizeEventData({ price: 29.123_456_789 })['price']).toBe(29.1235);
  });

  it('drops null, undefined and non-finite numbers', () => {
    const result = sanitizeEventData({
      a: undefined,
      b: null,
      c: Number.NaN,
      d: Number.POSITIVE_INFINITY,
      e: 'kept',
    });
    expect(result).toEqual({ e: 'kept' });
  });

  it('stringifies arrays and objects within limits', () => {
    const result = sanitizeEventData({ tags: ['a', 'b'], meta: { plan: 'pro' } });
    expect(result['tags']).toBe('a,b');
    expect(result['meta']).toBe('{"plan":"pro"}');
  });

  it('caps properties at 50', () => {
    const data: Record<string, number> = {};
    for (let index = 0; index < 60; index += 1) data[`k${index}`] = index;
    expect(Object.keys(sanitizeEventData(data))).toHaveLength(50);
  });
});

describe('trackEvent', () => {
  it('sends immediately when the tracker is loaded', () => {
    const { track } = installTracker();
    const status = trackEvent('cta_click', { location: 'hero' });
    expect(status).toBe('sent');
    expect(track).toHaveBeenCalledWith('cta_click', { location: 'hero' });
  });

  it('queues when the tracker has not loaded yet, then flushes on load', () => {
    expect(trackEvent('early_click')).toBe('queued');
    const { track } = installTracker();
    expect(flushUmamiQueue()).toBe(1);
    expect(track).toHaveBeenCalledWith('early_click', {});
  });

  it('never throws when the tracker fails and requeues the event', () => {
    globalThis.window.umami = {
      track: () => {
        throw new Error('tracker broken');
      },
    };
    expect(() => trackEvent('boom')).not.toThrow();

    const { track } = installTracker();
    expect(flushUmamiQueue()).toBe(1);
    expect(track).toHaveBeenCalledWith('boom', {});
  });

  it('drops events outside production without opt-in', () => {
    setNodeEnv('test');
    installTracker();
    expect(trackEvent('dev_click')).toBe('dropped');
  });

  it('tracks in non-production with the opt-in flag', () => {
    setNodeEnv('development');
    setDevOptIn('true');
    const { track } = installTracker();
    expect(trackEvent('dev_click')).toBe('sent');
    expect(track).toHaveBeenCalledTimes(1);
  });

  it('drops events when Do Not Track is enabled', () => {
    setDoNotTrack('1');
    installTracker();
    expect(trackEvent('dnt_click')).toBe('dropped');
  });
});

describe('getUmamiScriptProps', () => {
  const WEBSITE_ID = 'website-id';

  it('returns null without a website id', () => {
    expect(getUmamiScriptProps(undefined)).toBeNull();
  });

  it('proxies through same-origin with DNT support', () => {
    expect(getUmamiScriptProps(WEBSITE_ID)).toMatchObject({
      'data-website-id': WEBSITE_ID,
      'data-host-url': '/growth',
      'data-do-not-track': 'true',
      src: '/growth/script.js',
    });
  });

  it('supports domain allow-listing', () => {
    const props = getUmamiScriptProps(WEBSITE_ID, {
      domains: ['kevin-sauvage.com', 'www.kevin-sauvage.com'],
    });
    expect(props?.['data-domains']).toBe('kevin-sauvage.com,www.kevin-sauvage.com');
  });
});
