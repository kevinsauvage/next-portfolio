'use client';

import { useEffect } from 'react';

const REVEAL_SELECTOR = '.reveal:not(.is-visible)';

/** `.reveal` elements inside `root`, plus `root` itself when it qualifies. */
const findRevealElements = (root: ParentNode): HTMLElement[] => {
  const elements: HTMLElement[] = [];
  if (root instanceof HTMLElement && root.matches(REVEAL_SELECTOR)) elements.push(root);
  elements.push(...root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  return elements;
};

/**
 * Calls `onAdded` for every element subtree inserted below `document.body`.
 *
 * Required because the root layout — and therefore this component — survives
 * client-side navigation: a one-shot scan on mount would leave every page
 * visited afterwards stuck at `opacity: 0`, since its `.reveal` elements are
 * mounted long after this effect ran.
 */
const watchAddedNodes = (onAdded: (root: HTMLElement) => void): MutationObserver => {
  const observer = new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) onAdded(node);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
};

/**
 * Drives every `.reveal` element rendered by the server-side `Reveal` wrapper.
 *
 * One observer for the whole page instead of one per element: it keeps `Reveal`
 * a server component and replaces N `useEffect`s with a single one.
 *
 * Mirrors the previous per-element behaviour: elements reveal once when they
 * intersect the viewport, and are shown immediately when JS-driven motion is
 * unavailable (reduced-motion preference, no IntersectionObserver).
 */
const RevealObserver = () => {
  useEffect(() => {
    const reveal = (element: HTMLElement) => element.classList.add('is-visible');
    const motionIsOff =
      globalThis.window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined';

    if (motionIsOff) {
      for (const element of findRevealElements(document.body)) reveal(element);
      const mutations = watchAddedNodes(root => {
        for (const element of findRevealElements(root)) reveal(element);
      });
      return () => mutations.disconnect();
    }

    const intersection = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          intersection.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    const register = (root: ParentNode) => {
      for (const element of findRevealElements(root)) intersection.observe(element);
    };
    register(document.body);
    const mutations = watchAddedNodes(register);

    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
};

export default RevealObserver;
