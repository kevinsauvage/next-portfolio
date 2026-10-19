'use client';

import Link from 'next/link';

import { layout, NAVIGATION_SECTION_IDS, sectionIdFromHref } from '@/config/content/layout';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ANALYTICS_EVENTS } from '@/lib/analytics/events';

import clsx from 'clsx';

const Navigation = () => {
  const activeId = useActiveSection(NAVIGATION_SECTION_IDS);

  return (
    <nav className='flex items-center' aria-label='Primary'>
      <ul className='hidden lg:flex items-center gap-0.5 xl:gap-1'>
        {layout.header.navigation.items.map(({ label, href }) => {
          const isActive = activeId === sectionIdFromHref(href);

          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={isActive ? 'location' : undefined}
                data-analytics-event={ANALYTICS_EVENTS.NAV_SECTION_CLICK}
                data-analytics-location='header'
                data-analytics-section={label}
                className={clsx(
                  'text-sm md:text-base leading-normal',
                  'px-3 py-2 xl:px-4',
                  'rounded-md',
                  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out',
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
