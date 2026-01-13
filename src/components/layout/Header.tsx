'use client';

import { useEffect, useRef, useState } from 'react';

import { useFocusTrap } from '@/hooks/useFocusTrap';

import HeaderView from './HeaderView';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useFocusTrap(menuOpen);
  const ticking = useRef(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <HeaderView
      menuOpen={menuOpen}
      isScrolled={isScrolled}
      mobileMenuRef={mobileMenuRef as React.RefObject<HTMLDivElement>}
      toggleMenu={toggleMenu}
      closeMenu={closeMenu}
    />
  );
};

export default Header;
