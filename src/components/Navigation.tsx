'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

import clsx from 'clsx';
import { MoveUpRight } from 'lucide-react';

const Navigation: React.FC<{
  menuOpen: boolean;
  closeMenu: () => void;
}> = ({ menuOpen, closeMenu }) => {
  const t = useTranslations('shared.header');

  const navItems = ['home', 'about', 'portfolio', 'career', 'contact'].map((key) => ({
    href: `#${t(`nav.${key}`)?.toLowerCase()}`,
    label: t(`nav.${key}`),
  }));
  return (
    <div className="flex items-center gap-4 order-4 lg:order-none">
      <div
        className={clsx(
          'lg:flex items-center gap-4',
          !menuOpen && 'hidden lg:flex',
          menuOpen && 'fixed inset-0 bg-black z-50',
        )}
      >
        <div
          className={clsx(
            'flex flex-col justify-end gap-2 p-6 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 h-dvh w-full fixed left-[50%] translate-x-[-50%] max-w-max mx-auto bg-zinc-900 z-50  ',
            menuOpen && 'max-w-none',
            'lg:items-center lg:rounded-full lg:border lg:border-zinc-800 lg:flex-row lg:bg-opacity-65 lg:w-fit lg:h-fit lg:bottom-auto lg:gap-6 lg:p-4',
          )}
        >
          {navItems?.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              aria-label={`Go to ${label} section`}
              className={clsx(
                'flex items-center justify-between rounded-md p-6 gap-1 border bg-zinc-950 border-zinc-800 w-full font-normal whitespace-nowrap text-lg last:mb-0 no-underline text-zinc-200',
                'lg:border-none lg:p-0 lg:bg-transparent lg:font-light',
              )}
            >
              {label}
              <MoveUpRight aria-label="Hire me" strokeWidth={1.5} size={18} className="lg:hidden" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
