'use client';

import { useEffect } from 'react';

const SCROLLED_AT = 10;
const SCROLLED_FAR_AT = 300;

/** Mirrors scroll depth onto <html> classes so CSS can react without re-renders. */
const ScrollDetector = () => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { classList } = document.documentElement;
          classList.toggle('page-scrolled', window.scrollY > SCROLLED_AT);
          classList.toggle('page-scrolled-far', window.scrollY > SCROLLED_FAR_AT);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollDetector;
