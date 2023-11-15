'use client';

import { useEffect, useState } from 'react';

import Header from './Header';

const HeaderPresenter = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let scrollTopPrevious = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      if (scrollTop > 0 && scrollTop > scrollTopPrevious) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      scrollTopPrevious = scrollTop;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Header isScrolled={isScrolled && isScrollingUp} />;
};

export default HeaderPresenter;
