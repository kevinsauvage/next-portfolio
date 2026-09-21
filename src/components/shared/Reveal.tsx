'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for sequential reveals. */
  delay?: number;
  /** Render as a different element (defaults to `div`). */
  as?: 'div' | 'section' | 'header' | 'p' | 'li' | 'span';
};

/**
 * Fades/slides content in the first time it enters the viewport.
 *
 * This is the single entrance-animation primitive for the site. It renders
 * visible immediately when JS-driven motion is unavailable (reduced-motion
 * preference, no IntersectionObserver, or JS disabled), so content is never
 * trapped at `opacity: 0`.
 */
const Reveal = ({ children, className, delay = 0, as: Component = 'div' }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      globalThis.window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setIsVisible(true);
      return;
    }
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={ref as React.Ref<never>}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={clsx('reveal', isVisible && 'is-visible', className)}
    >
      {children}
    </Component>
  );
};

export default Reveal;
