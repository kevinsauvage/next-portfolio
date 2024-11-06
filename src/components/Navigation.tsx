'use client';

import Link from 'next/link';

import clsx from 'clsx';
import { X } from 'lucide-react';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'career', label: 'Career' },
  { id: 'contact', label: 'Contact' },
];

const Navigation: React.FC<{
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={clsx('flex items-center gap-4')}>
      <div
        className={clsx(
          'flex flex-col items-center justify-center gap-4 h-dvh w-full fixed top-0 left-0 bottom-0 bg-zinc-900 z-50 md:static md:flex-row md:bg-transparent md:w-auto md:h-auto ',
          !menuOpen && 'hidden md:flex',
        )}
      >
        {menuOpen && (
          <X
            className="md:hidden ml-auto absolute top-3 right-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        )}
        {navItems.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            aria-label={`Go to ${id} section`}
            className={clsx(
              'flex items-center justify-between gap-1 font-light whitespace-nowrap text-lg last:mb-0 no-underline text-zinc-300',
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
