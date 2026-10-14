import PageViewTracker from './PageViewTracker';

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { trackPageView } = vi.hoisted(() => ({ trackPageView: vi.fn() }));

vi.mock('@/lib/analytics', () => ({ trackPageView }));

/** Mutable pathname so a test can simulate a client-side route change. */
let pathname = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
}));

describe('PageViewTracker', () => {
  beforeEach(() => {
    pathname = '/';
    trackPageView.mockClear();
  });

  it('does not report the initial render (the GA4 config tag owns the first pageview)', () => {
    render(<PageViewTracker />);

    expect(trackPageView).not.toHaveBeenCalled();
  });

  it('reports each subsequent navigation once', () => {
    const { rerender } = render(<PageViewTracker />);

    pathname = '/projects/modern-ecommerce-platform';
    rerender(<PageViewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(1);

    pathname = '/privacy';
    rerender(<PageViewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(2);

    // A re-render with the same pathname must not fire again.
    rerender(<PageViewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(2);
  });
});
