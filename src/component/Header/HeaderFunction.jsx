import { useEffect, useState } from 'react';
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

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > 50) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return { menuIsOpen, scrolled, setMenuIsOpen };
};

export default HeaderFunction;
