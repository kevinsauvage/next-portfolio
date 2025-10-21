'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Logo from './Logo';
import Navigation from './Navigation';

import { MenuIcon, MoveDown, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <header className='fixed top-0 left-0 z-50 w-full bg-zinc-950 backdrop-filter backdrop-blur-sm bg-opacity-50 lg:absolute lg:top-3 lg:bg-transparent lg:backdrop-blur-none'>
      <div className='flex justify-between m-auto items-center xl:container p-4'>
        <Logo />
        <Navigation closeMenu={() => setMenuOpen(false)} menuOpen={menuOpen} />
        <div className='flex gap-4 items-center justify-end order-4'>
          <Link
            href="#contact"
            className='hidden w-fit ml-auto font-normal lg:flex md:gap-2'
            data-umami-event='header_cta_contact'
          >
            Contact Me
            <MoveDown aria-label='Hire me' strokeWidth={1.5} size={18} />{' '}
          </Link>
          {menuOpen ? (
            <X
              className='lg:hidden cursor-pointer z-50'
              onClick={() => setMenuOpen(!menuOpen)}
              size={40}
              strokeWidth={1}
            />
          ) : (
            <MenuIcon
              className='lg:hidden cursor-pointer'
              onClick={() => setMenuOpen(!menuOpen)}
              size={40}
              strokeWidth={1}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
