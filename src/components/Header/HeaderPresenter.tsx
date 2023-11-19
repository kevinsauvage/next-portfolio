'use client';

import { useEffect, useState } from 'react';

import Header from './Header';

const HeaderPresenter = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const { scrollTop } = document.documentElement;

      if (scrollTop < 50) {
        setIsScrollingUp(false);
        setIsScrollingDown(false);
        return;
      }

      if (scrollTop > lastScrollTop) {
        setIsScrollingUp(false);
        setIsScrollingDown(true);
      } else {
        setIsScrollingUp(true);
        setIsScrollingDown(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Header isScrollingUp={isScrollingUp} isScrollingDown={isScrollingDown} />;
};

export default HeaderPresenter;
