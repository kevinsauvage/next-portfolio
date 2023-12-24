'use client';

import { useEffect, useState } from 'react';

import Header from './Header';

const threshold = 350;

const HeaderPresenter = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Control the header's scroll direction when the page loads
  useEffect(() => {
    const { scrollTop } = document.documentElement;

    if (scrollTop > 0) {
      setIsScrollingDown(true);
      setIsScrollingUp(false);
    }
  }, []);

  // Control the header's scroll direction when the user scrolls
  useEffect(() => {
    let lastScrollTop = 0;
    let lastScrollUp = 0;
    let lastScrollDown = 0;

    const handleScroll = () => {
      const { scrollTop } = document.documentElement;

      if (scrollTop === 0) setIsAtTop(true);
      else setIsAtTop(false);

      // Handle scroll up
      if (scrollTop < lastScrollTop) {
        lastScrollUp = scrollTop;

        if (lastScrollUp < lastScrollDown - threshold || scrollTop < 50) {
          setIsScrollingUp(true);
          setIsScrollingDown(false);
        }
      }

      // Handle scroll down
      if (scrollTop > lastScrollTop) {
        lastScrollDown = scrollTop;

        if (lastScrollDown > lastScrollUp + threshold) {
          setIsScrollingUp(false);
          setIsScrollingDown(true);
        }
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Header isScrollingUp={isScrollingUp} isScrollingDown={isScrollingDown} isAtTop={isAtTop} />
  );
};

export default HeaderPresenter;
