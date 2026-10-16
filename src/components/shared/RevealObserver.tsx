'use client';

import { useEffect } from 'react';

/**
 * Drives every `.reveal` element rendered by the server-side `Reveal` wrapper.
 *
 * One observer for the whole page instead of one per element: it keeps `Reveal`
 * a server component (so wrapped subtrees stay out of the RSC flight payload)
 * and replaces N `useEffect`s with a single one.
 *
 * Mirrors the previous per-element behaviour: elements reveal once when they
 * intersect the viewport, and are shown immediately when JS-driven motion is
 * unavailable (reduced-motion preference, no IntersectionObserver).
 */
const RevealObserver = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (elements.length === 0) return;

    const showAll = () => {
      for (const element of elements) element.classList.add('is-visible');
    };

    if (
      globalThis.window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    for (const element of elements) observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default RevealObserver;
