'use client';

import Link from 'next/link';

import { layout } from '@/config/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';

const sectionIdFromHref = (href: string) => href.replace(/^\/#/, '');

const SECTION_IDS = layout.header.navigation.items.map(({ href }) => sectionIdFromHref(href));

const Navigation = () => {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav className='flex items-center' aria-label='Primary'>
      <ul className='hidden lg:flex items-center gap-0.5 xl:gap-1'>
        {layout.header.navigation.items.map(({ label, href }) => {
          const isActive = activeId === sectionIdFromHref(href);

          return (
            <li key={label}>
              <Link
                href={href}
                aria-label={`Go to ${label} section`}
                aria-current={isActive ? 'true' : undefined}
                data-umami-event={UMAMI_EVENTS.NAV_SECTION_CLICK}
                data-umami-event-location='header'
                data-umami-event-section={label}
                className={clsx(
                  'text-sm md:text-base leading-normal',
                  'px-3 py-2 xl:px-4',
                  'rounded-md',
                  'transition-all duration-200 ease-out',
                  'border',
                  'active:scale-95',
                  isActive
                    ? 'border-primary-700/50 bg-primary-950/50 font-medium text-primary-300'
                    : 'border-transparent font-normal text-zinc-400 hover:scale-105 hover:bg-zinc-800/50 hover:text-zinc-100 hover:shadow-md'
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

export default Navigation;
