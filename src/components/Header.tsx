'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import Navigation from './Navigation';

import { MenuIcon, MoveUpRight, X } from 'lucide-react';

type Properties = {
  lang: string;
  translations: {
    nav: {
      home: string;
      about: string;
      portfolio: string;
      career: string;
      contact: string;
    };
    cta: {
      contact: string;
    };
  };
};

const Header = ({ translations, lang }: Properties) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      <Logo lang={lang} />
      <Navigation
        closeMenu={() => setMenuOpen(false)}
        menuOpen={menuOpen}
        navItems={
          translations &&
          Object.values(translations?.nav)?.map((item) => ({
            href: `/${lang}/#${item.toLowerCase()}`,
            label: item,
          }))
        }
      />
      <div className="flex gap-4 items-center justify-end order-4">
        <Link
          href={`/${lang}#contact`}
          className="hidden w-fit ml-auto font-normal lg:flex md:gap-2"
        >
          {translations?.cta.contact}
          <MoveUpRight aria-label="Hire me" strokeWidth={1.5} size={18} />{' '}
        </Link>
        <LanguageSwitcher lang={lang as string} className={menuOpen ? '' : 'hidden lg:block'} />
        {menuOpen ? (
          <X
            className="lg:hidden cursor-pointer z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            size={40}
            strokeWidth={1}
          />
        ) : (
          <MenuIcon
            className="lg:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            size={40}
            strokeWidth={1}
          />
        )}
      </div>
    </>
  );
};

export default Header;
