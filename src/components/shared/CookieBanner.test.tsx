import { cookies as copy } from '@/config/content';
import { CONSENT_COOKIE, CONSENT_UPDATED_EVENT } from '@/lib/consent';

import CookieBanner from './CookieBanner';

import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const clearConsentCookie = () => {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0`;
};

const storedConsent = (): Record<string, boolean> | null => {
  const entry = document.cookie.split('; ').find(value => value.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;
  return JSON.parse(decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1)));
};

beforeEach(() => {
  clearConsentCookie();
});

afterEach(() => {
  clearConsentCookie();
});

describe('CookieBanner', () => {
  it('shows the summary with accept, reject and customize', () => {
    render(<CookieBanner />);

    expect(screen.getByText(copy.banner.title)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: copy.banner.acceptAll })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: copy.banner.rejectAll })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: copy.banner.customize })).toBeInTheDocument();
  });

  it('stores a full grant and notifies listeners on accept', () => {
    const listener = vi.fn();
    window.addEventListener(CONSENT_UPDATED_EVENT, listener);
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole('button', { name: copy.banner.acceptAll }));

    expect(storedConsent()).toMatchObject({
      ad_storage: true,
      analytics_storage: true,
      functionality_storage: true,
      personalization_storage: true,
    });
    expect(listener).toHaveBeenCalledTimes(1);
    // The banner leaves the page once a choice is stored.
    expect(screen.queryByText(copy.banner.title)).not.toBeInTheDocument();

    window.removeEventListener(CONSENT_UPDATED_EVENT, listener);
  });

  it('keeps strictly necessary storage on when rejecting', () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole('button', { name: copy.banner.rejectAll }));

    expect(storedConsent()).toMatchObject({
      ad_storage: false,
      analytics_storage: false,
      functionality_storage: true,
      personalization_storage: false,
    });
  });
});

describe('CookieBanner preferences', () => {
  it('expands to the category form and saves the ticked categories', () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole('button', { name: copy.banner.customize }));
    expect(screen.getByText(copy.preferences.title)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('checkbox', { name: /analytics/i }));
    fireEvent.click(screen.getByRole('button', { name: copy.preferences.save }));

    expect(storedConsent()).toMatchObject({
      analytics_storage: true,
      ad_storage: false,
      functionality_storage: true,
    });
  });

  it('opens straight into the preferences when reopened from the footer', () => {
    render(<CookieBanner openSettings />);

    expect(screen.queryByText(copy.banner.title)).not.toBeInTheDocument();
    expect(screen.getByText(copy.preferences.title)).toBeInTheDocument();
  });

  it('falls back to the banner when preferences are closed with no stored choice', () => {
    render(<CookieBanner openSettings />);

    fireEvent.click(screen.getByRole('button', { name: 'Close cookie preferences' }));

    expect(screen.getByText(copy.banner.title)).toBeInTheDocument();
  });
});
