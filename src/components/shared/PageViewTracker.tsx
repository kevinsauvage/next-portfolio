'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { trackPageView } from '@/lib/analytics';

/**
 * Reports App Router navigations to GA4 as `page_view` events.
 *
 * A client-side navigation never reloads the document, so without this only the
 * landing page would ever be counted. The first render is skipped on purpose:
 * the initial pageview comes from the GA4 `config` call, so reporting it here
 * would double-count. Consent, DNT and the dev guard live in `trackPageView`.
 */
const PageViewTracker = () => {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
};

export default PageViewTracker;
