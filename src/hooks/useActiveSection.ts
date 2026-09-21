'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 *
 * Uses IntersectionObserver with a zero-height band at the viewport centre, so
 * exactly one section is "active" at a time and the value stays stable while
 * scrolling. Degrades gracefully when IntersectionObserver is unavailable
 * (SSR, older browsers, tests) by returning `null`.
 */
export const useActiveSection = (sectionIds: readonly string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

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
  }, [sectionIds]);

  return activeId;
};

export default useActiveSection;
