'use client';

import Link from 'next/link';

import { animations, colors, getTypographyClasses, radius } from '@/design-system/tokens';

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
                  // Typography and sizing from design system
                  getTypographyClasses('bodySmall'),
                  'px-4 py-2',
                  radius.sm,
                  // Motion tokens
                  'transition-all',
                  animations.duration.fast,
                  animations.timing.easeOut,
                  colors.text.hover.light,
                  'hover:scale-105 active:scale-95',
                  // States
                  isActive
                    ? clsx(colors.text.light, 'bg-accent-400/10 shadow-sm')
                    : clsx(colors.text.muted, 'hover:bg-zinc-800/50 hover:shadow-md')
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
