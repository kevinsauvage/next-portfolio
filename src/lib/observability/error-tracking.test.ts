import { logError } from './error-tracking';

import * as Sentry from '@sentry/nextjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@sentry/nextjs', () => ({ captureException: vi.fn() }));
vi.mock('../analytics', () => ({ trackEvent: vi.fn() }));

import { trackEvent } from '../analytics';

describe('logError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('reports to Sentry tagged with the code and context', () => {
    const error = new Error('boom');
    logError(error, 'contact_unexpected', { attempt: 2 });

    expect(Sentry.captureException).toHaveBeenCalledWith(error, {
      extra: { attempt: 2, code: 'contact_unexpected' },
      tags: { code: 'contact_unexpected' },
    });
  });

  it('sends only the code to analytics, never the raw message', () => {
    logError(new Error('secret@example.com failed'), 'contact_unexpected');

    expect(trackEvent).toHaveBeenCalledWith('error_client', { code: 'contact_unexpected' });
  });
});
