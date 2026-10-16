import RevealObserver from './RevealObserver';

import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const IS_VISIBLE = 'is-visible';

const mockReducedMotion = (matches: boolean) => {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) => ({ matches, media: query }) as MediaQueryList
  );
};

/** Adds `.reveal` elements to the document the way the server-rendered markup does. */
const createRevealElements = (count: number): HTMLElement[] => {
  return Array.from({ length: count }, () => {
    const element = document.createElement('div');
    element.className = 'reveal';
    document.body.append(element);
    return element;
  });
};

type ObserverStub = {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  /** Simulates the entry that appears when an element scrolls into view. */
  fireIntersection: (target: HTMLElement) => void;
};

const stubIntersectionObserver = (): ObserverStub => {
  let callback: IntersectionObserverCallback | undefined;
  const instance = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(() => []),
    root: null,
    rootMargin: '',
    thresholds: [],
  };
  class IntersectionObserverStub {
    constructor(cb: IntersectionObserverCallback) {
      callback = cb;
    }
    observe = instance.observe;
    unobserve = instance.unobserve;
    disconnect = instance.disconnect;
    takeRecords = instance.takeRecords;
    root = instance.root;
    rootMargin = instance.rootMargin;
    thresholds = instance.thresholds;
  }
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);

  return {
    observe: instance.observe,
    unobserve: instance.unobserve,
    fireIntersection: target => {
      callback?.(
        [{ isIntersecting: true, target } as unknown as IntersectionObserverEntry],
        instance as unknown as IntersectionObserver
      );
    },
  };
};

describe('RevealObserver fallbacks', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    mockReducedMotion(false);
    vi.unstubAllGlobals();
  });

  it('reveals everything at once when reduced motion is preferred', () => {
    mockReducedMotion(true);
    const elements = createRevealElements(3);

    render(<RevealObserver />);

    for (const element of elements) expect(element).toHaveClass(IS_VISIBLE);
  });

  it('reveals everything at once when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const elements = createRevealElements(2);

    render(<RevealObserver />);

    for (const element of elements) expect(element).toHaveClass(IS_VISIBLE);
  });
});

describe('RevealObserver intersection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    mockReducedMotion(false);
    vi.unstubAllGlobals();
  });

  it('reveals an element only once it intersects, then stops observing it', () => {
    const observer = stubIntersectionObserver();
    const [first, second] = createRevealElements(2);

    render(<RevealObserver />);

    expect(observer.observe).toHaveBeenCalledTimes(2);
    expect(first).not.toHaveClass(IS_VISIBLE);

    observer.fireIntersection(first as HTMLElement);

    expect(first).toHaveClass(IS_VISIBLE);
    expect(second).not.toHaveClass(IS_VISIBLE);
    expect(observer.unobserve).toHaveBeenCalledWith(first);
  });

  it('does nothing when there is no reveal element on the page', () => {
    const observer = stubIntersectionObserver();

    render(<RevealObserver />);

    expect(observer.observe).not.toHaveBeenCalled();
  });
});
