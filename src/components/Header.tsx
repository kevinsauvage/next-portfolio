'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import Button from './Button';
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

  return (
    <header
      className={`md:fixed top-0 left-0 z-50 w-full p-4 
         bg-zinc-950 backdrop-filter backdrop-blur-3xl bg-opacity-95`}
    >
      <div className="flex justify-between m-auto items-center container max-w-5xl">
        <Logo />
        <div className="flex gap-4">
          {!menuOpen && <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
          <Link href="/#contact" passHref className="hidden md:flex w-fit ml-auto">
            <Button label="Hire me" svg={<MoveUpRight strokeWidth={1.5} size={18} />} />
          </Link>
          <MenuIcon
            className="md:hidden ml-auto cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
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
