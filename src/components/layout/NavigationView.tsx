import Link from 'next/link';

import { animations, colors, getTypographyClasses, radius } from '@/design-system/tokens';

import clsx from 'clsx';

type NavItem = { readonly label: string; readonly href: string };

type NavigationViewProps = {
  navItems: readonly NavItem[];
  activeSection: string;
};

const NavigationView = ({ navItems, activeSection }: NavigationViewProps) => {
  return (
    <nav className='flex items-center' role='navigation' aria-label='Main navigation'>
      <ul className='hidden lg:flex items-center gap-0.5 xl:gap-1'>
        {navItems.map(({ label, href }) => {
          const isActive = activeSection === href.substring(1);
          return (
            <li key={label}>
              <Link
                href={href}
                aria-label={`Go to ${label} section`}
                data-umami-event='header_nav_click'
                data-umami-event-label={label}
                className={clsx(
                  getTypographyClasses('bodySmall'),
                  'px-3 py-2 xl:px-4',
                  radius.sm,
                  'transition-all',
                  animations.duration.fast,
                  animations.timing.easeOut,
                  colors.text.hover.light,
                  'hover:scale-105 active:scale-95',
                  'border',
                  isActive
                    ? clsx(colors.text.light, 'bg-zinc-800/50 border-zinc-700/50 shadow-sm')
                    : clsx(
                        colors.text.muted,
                        'border-transparent hover:bg-zinc-800/50 hover:shadow-md'
                      )
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
