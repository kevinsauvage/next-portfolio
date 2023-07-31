import { useEffect, useState } from 'react';

import styles from './ScrollDownAnimation.module.scss';

const ScrollDownAnimation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <div className={`${styles.mouse} ${scrolled ? styles.scrolled : ''}`} />;
};

export default ScrollDownAnimation;
