import { useEffect, useRef, useState } from 'react';
import { Router } from 'next/router';

const HeaderFunction = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  Router.events.on('hashChangeStart', () => {
    if (menuIsOpen) setMenuIsOpen(false);
  });

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = menuIsOpen ? 'hidden' : 'auto';
  }, [menuIsOpen]);

  const previousScrollPos = useRef(0);

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const isScrollingUp = winScroll < previousScrollPos.current && winScroll > 0;
    setScrolled(isScrollingUp);
    previousScrollPos.current = winScroll;
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return { menuIsOpen, scrolled, setMenuIsOpen };
};

export default HeaderFunction;
