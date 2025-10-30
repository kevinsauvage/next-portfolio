'use client';

import Link from 'next/link';

import clsx from 'clsx';

type NavItem = { readonly label: string; readonly href: string };

type NavigationViewProps = {
  navItems: readonly NavItem[];
  activeSection: string;
  closeMenu: () => void;
};

const NavigationView = ({ navItems, activeSection, closeMenu }: NavigationViewProps) => {
  return (
    <nav className='flex items-center' role='navigation' aria-label='Main navigation'>
      <ul className='hidden lg:flex items-center gap-1'>
        {navItems.map(({ label, href }) => {
          const isActive = activeSection === href.substring(1);
          return (
            <li key={label}>
              <Link
                href={href}
                onClick={closeMenu}
                aria-label={`Go to ${label} section`}
                data-umami-event='header_nav_click'
                data-umami-event-label={label}
                className={clsx(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  'hover:scale-105 active:scale-95',
                  isActive
                    ? 'text-blue-400 bg-blue-400/10 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 hover:shadow-md'
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationView;
