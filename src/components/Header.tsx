'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import Navigation from './Navigation';

import { MenuIcon, MoveUpRight, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('shared.header');

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
    <header className="absolute top-3 left-0 z-50 w-full bg-opacity-95">
      <div className="flex justify-between m-auto items-center xl:container p-4">
        <Logo />
        <Navigation closeMenu={() => setMenuOpen(false)} menuOpen={menuOpen} />
        <div className="flex gap-4 items-center justify-end order-4">
          <Link href={t('cta.href')} className="hidden w-fit ml-auto font-normal lg:flex md:gap-2">
            {t('cta.contact')}
            <MoveUpRight aria-label="Hire me" strokeWidth={1.5} size={18} />{' '}
          </Link>
          <LanguageSwitcher className={menuOpen ? '' : 'hidden lg:block'} />
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
      </div>
    </header>
  );
};

export default Header;
