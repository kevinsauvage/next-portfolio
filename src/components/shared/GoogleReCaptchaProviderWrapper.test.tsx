import type { ReactNode } from 'react';

import GoogleReCaptchaProviderWrapper from './GoogleReCaptchaProviderWrapper';

import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * `evaluations` counts how many times the library module is evaluated. The
 * wrapper must not import it: if it did, the count would already be 1 before the
 * form scrolls into view.
 */
const recaptchaLib = vi.hoisted(() => ({
  evaluations: 0,
  testId: 'recaptcha-provider',
  childText: 'form',
}));

vi.mock('react-google-recaptcha-v3', async () => {
  const { createElement } = await import('react');
  recaptchaLib.evaluations += 1;
  return {
    GoogleReCaptchaProvider: ({ children }: { children?: ReactNode }) =>
      createElement('div', { 'data-testid': recaptchaLib.testId }, children),
  };
});

type ObserverStub = {
  /** Simulates the entry that appears when the observed element scrolls into view. */
  fireIntersection: () => void;
};

const stubIntersectionObserver = (): ObserverStub => {
  let callback: IntersectionObserverCallback | undefined;
  let observed: Element | undefined;
  class IntersectionObserverStub {
    constructor(cb: IntersectionObserverCallback) {
      callback = cb;
    }
    observe = (target: Element) => {
      observed = target;
    };
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);

  return {
    fireIntersection: () => {
      callback?.(
        [{ isIntersecting: true, target: observed } as unknown as IntersectionObserverEntry],
        { disconnect: vi.fn() } as unknown as IntersectionObserver
      );
    },
  };
};

const renderWrapper = () =>
  render(
    <GoogleReCaptchaProviderWrapper reCaptchaKey='test-key'>
      <p>{recaptchaLib.childText}</p>
    </GoogleReCaptchaProviderWrapper>
  );

describe('GoogleReCaptchaProviderWrapper', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders children without loading the reCAPTCHA library before intersecting', () => {
    stubIntersectionObserver();

    renderWrapper();

    expect(screen.getByText(recaptchaLib.childText)).toBeInTheDocument();
    expect(screen.queryByTestId(recaptchaLib.testId)).not.toBeInTheDocument();
    expect(recaptchaLib.evaluations).toBe(0);
  });

  it('mounts the provider, and only then evaluates the library, once it intersects', async () => {
    const observer = stubIntersectionObserver();

    renderWrapper();
    expect(recaptchaLib.evaluations).toBe(0);

    act(() => observer.fireIntersection());

    expect(await screen.findByTestId(recaptchaLib.testId)).toBeInTheDocument();
    expect(screen.getByText(recaptchaLib.childText)).toBeInTheDocument();
    expect(recaptchaLib.evaluations).toBe(1);
  });
});
