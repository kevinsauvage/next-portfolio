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
    <div
      className={clsx(
        'md:flex items-center gap-4',
        !menuOpen && 'hidden md:flex',
        menuOpen && 'fixed inset-0 bg-black z-50',
      )}
    >
      <div
        className={clsx(
          'flex flex-col items-center justify-center px-5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-2 md:rounded-full md:border md:border-zinc-800 gap-8 h-dvh w-full fixed left-[50%] translate-x-[-50%] max-w-max mx-auto bg-zinc-900 z-50 md:flex-row md:bg-opacity-65 md:w-fit md:h-fit md:bottom-auto ',
          menuOpen && 'max-w-none',
        )}
      >
        {menuOpen && (
          <X
            className="md:hidden ml-auto absolute top-9 right-4 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            size={30}
          />
        )}
        {navItems.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            aria-label={`Go to ${id} section`}
            className={clsx(
              'flex items-center aspect-video rounded-full justify-center gap-1 border border-zinc-700 max-w-32 w-full font-light whitespace-nowrap text-lg last:mb-0 no-underline text-zinc-300',
              'md:border-none',
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
