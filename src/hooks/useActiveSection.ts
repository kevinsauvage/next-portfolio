'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 *
 * Uses IntersectionObserver with a zero-height band at the viewport centre, so
 * exactly one section is "active" at a time and the value stays stable while
 * scrolling. Degrades gracefully when IntersectionObserver is unavailable
 * (SSR, older browsers, tests) by returning `null`.
 *
 * The observer is rebuilt per route: the header and the mobile menu live in the
 * layout and stay mounted while navigating, so a single run would keep observing
 * the previous route's (now detached) elements — the highlight would stick on
 * the last section after visiting a page such as `/privacy` and coming back.
 */
export const useActiveSection = (sectionIds: readonly string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    // The targeted sections only exist on the home route. Anywhere else, clear
    // the highlight so a stale id cannot stay marked as current.
    if (elements.length === 0) {
      setActiveId(null);
      return;
    }

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Pick the first section in document order that is crossing the band.
        const next = elements.find(element => visible.has(element.id));
        if (next) setActiveId(next.id);
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    for (const element of elements) observer.observe(element);

    return () => observer.disconnect();
  }, [pathname, sectionIds]);

  return activeId;
};

export default useActiveSection;
