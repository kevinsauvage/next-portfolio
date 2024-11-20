'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import ClientPortal from './ClientPortal';
import Logo from './Logo';
import Navigation from './Navigation';

import { MenuIcon, MoveUpRight } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const parameters = useParams();

  useEffect(() => {
    setMenuOpen(false);
  }, [parameters]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="absolute top-3 left-0 z-50 w-full bg-opacity-95">
      <div className="flex justify-between m-auto items-center container p-4">
        <Logo />
        {!menuOpen && <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
        <div className="flex gap-4">
          <Link href="/#contact" passHref className="hidden w-fit ml-auto md:flex md:gap-4">
            Hire Me
            <MoveUpRight aria-label="Hire me" strokeWidth={1.5} size={18} />{' '}
          </Link>
          <MenuIcon
            className="md:hidden ml-auto cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            size={30}
          />
        </div>

        <ClientPortal show={menuOpen} selector="myPortal">
          <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </ClientPortal>
      </div>
    </header>
  );
};

export default Header;
