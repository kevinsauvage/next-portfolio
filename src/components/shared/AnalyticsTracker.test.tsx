import { CONSENT_COOKIE, type ConsentSettings, writeStoredConsent } from '@/lib/consent';

import AnalyticsTracker from './AnalyticsTracker';

import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const GRANTED: ConsentSettings = {
  ad_storage: false,
  analytics_storage: true,
  functionality_storage: true,
  personalization_storage: false,
};

beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'production');
  writeStoredConsent(GRANTED);
  delete globalThis.window.dataLayer;
});

afterEach(() => {
  vi.unstubAllEnvs();
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
});

describe('AnalyticsTracker', () => {
  it('tracks a tagged element with its data attributes', () => {
    render(
      <>
        <AnalyticsTracker />
        <a
          href='https://example.com'
          data-analytics-event='social_link_click'
          data-analytics-location='footer'
          data-analytics-network='LinkedIn'
        >
          LinkedIn
        </a>
      </>
    );

    fireEvent.click(screen.getByRole('link', { name: 'LinkedIn' }));

    expect(globalThis.window.dataLayer).toEqual([
      { event: 'social_link_click', location: 'footer', network: 'LinkedIn' },
    ]);
  });

  it('resolves the nearest tagged ancestor for a nested click', () => {
    render(
      <>
        <AnalyticsTracker />
        <button type='button' data-analytics-event='ui_back_to_top_click'>
          <span>Top</span>
        </button>
      </>
    );

    fireEvent.click(screen.getByText('Top'));

    expect(globalThis.window.dataLayer).toEqual([{ event: 'ui_back_to_top_click' }]);
  });

  it('ignores clicks outside any tagged element', () => {
    render(
      <>
        <AnalyticsTracker />
        <button type='button'>Plain</button>
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Plain' }));

    expect(globalThis.window.dataLayer ?? []).toHaveLength(0);
  });
});
