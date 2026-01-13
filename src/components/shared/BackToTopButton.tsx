'use client';

import { useEffect, useRef, useState } from 'react';

import BackToTopButtonView from './BackToTopButtonView';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <BackToTopButtonView isVisible={isVisible} onClick={scrollToTop} />;
};

export default BackToTopButton;
