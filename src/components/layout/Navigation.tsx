import Link from 'next/link';

import { layout } from '@/config/content';

import clsx from 'clsx';

const Navigation = () => {
  return (
    <nav className='flex items-center' role='navigation' aria-label='Main navigation'>
      <ul className='hidden lg:flex items-center gap-0.5 xl:gap-1'>
        {layout.header.navigation.items.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              aria-label={`Go to ${label} section`}
              data-umami-event='header_nav_click'
              data-umami-event-label={label}
              className={clsx(
                'text-sm md:text-base leading-normal font-normal',
                'px-3 py-2 xl:px-4',
                'rounded-md',
                'transition-all duration-200 ease-out',
                'text-zinc-400 hover:text-zinc-100',
                'hover:scale-105 active:scale-95',
                'border border-transparent',
                'hover:bg-zinc-800/50 hover:shadow-md'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
