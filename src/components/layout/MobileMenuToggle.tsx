'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import { BodySmall, H4 } from '@/components/ui/Typography';
import { layout, NAVIGATION_SECTION_IDS, sectionIdFromHref } from '@/config/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';
import { ChevronRight, MenuIcon, X } from 'lucide-react';

const MobileMenuToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeId = useActiveSection(NAVIGATION_SECTION_IDS);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The native modal <dialog> provides the focus trap, Escape handling, inert
  // background and focus restoration; React only mirrors its open state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();

    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(previous => !previous);

  return (
    <>
      <button
        className='lg:hidden p-3 rounded-md hover:bg-zinc-800/50 transition-colors relative z-50 min-w-[48px] min-h-[48px] flex items-center justify-center'
        onClick={toggleMenu}
        aria-label={
          menuOpen ? layout.header.mobileMenu.closeButton : layout.header.mobileMenu.openButton
        }
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <X size={28} strokeWidth={1.5} className='text-zinc-200' aria-hidden='true' />
        ) : (
          <MenuIcon size={28} strokeWidth={1.5} className='text-zinc-200' aria-hidden='true' />
        )}
      </button>

      {/* Clicks on the dialog element itself land on its backdrop; Escape is handled natively. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <dialog
        ref={dialogRef}
        onClose={closeMenu}
        onClick={event => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        aria-label='Navigation menu'
        className='lg:hidden fixed top-0 right-0 bottom-0 left-auto m-0 p-0 h-dvh max-h-none w-full max-w-sm bg-zinc-900 border-l border-zinc-800 text-zinc-50 backdrop:bg-black/95 backdrop:backdrop-blur-lg animate-slide-in-left'
      >
        <div className='flex flex-col h-full'>
          <div className='p-6 border-b border-zinc-800 flex items-center justify-between'>
            <div>
              <H4 className='mb-0'>{layout.header.mobileMenu.title}</H4>
              <BodySmall className='mt-1'>{layout.header.mobileMenu.subtitle}</BodySmall>
            </div>
            <button
              onClick={closeMenu}
              className='p-2 rounded-md hover:bg-zinc-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center'
              aria-label='Close navigation menu'
            >
              <X size={24} strokeWidth={1.5} className='text-zinc-400' aria-hidden='true' />
            </button>
          </div>

          <nav aria-label='Mobile' className='flex-1 overflow-y-auto p-4'>
            <ul>
              {layout.header.navigation.items.map(({ label, href }, index) => {
                const isActive = activeId === sectionIdFromHref(href);

                return (
                  <li
                    key={label}
                    className='card-enter'
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={isActive ? 'true' : undefined}
                      data-analytics-event={ANALYTICS_EVENTS.NAV_SECTION_CLICK}
                      data-analytics-location='mobile'
                      data-analytics-section={label}
                      className={clsx(
                        'flex items-center justify-between p-4 mb-2 rounded-lg border transition-all duration-200 group min-h-[56px]',
                        isActive
                          ? 'border-primary-600/60 bg-primary-950/50'
                          : 'border-zinc-700/50 bg-zinc-800/50 hover:border-primary-500/50 hover:bg-zinc-800 active:bg-zinc-700'
                      )}
                    >
                      <BodySmall
                        className={clsx(
                          'font-medium text-lg',
                          isActive ? 'text-primary-200' : 'text-zinc-50'
                        )}
                      >
                        {label}
                      </BodySmall>
                      <ChevronRight
                        size={20}
                        className={clsx(
                          'transition-all group-hover:translate-x-1 group-hover:text-secondary-400',
                          isActive ? 'text-primary-300' : 'text-zinc-400'
                        )}
                        aria-hidden='true'
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className='p-6 border-t border-zinc-800 space-y-4'>
            <div className='flex justify-center'>
              <ContactInfo size={22} eventPrefix='mobile_menu' />
            </div>
            <Link
              href={layout.header.resumeHref}
              target='_blank'
              rel='noopener noreferrer'
              onClick={closeMenu}
              data-analytics-event={ANALYTICS_EVENTS.CTA_RESUME_CLICK}
              data-analytics-location='mobile_menu'
              className='flex items-center justify-center gap-2 w-full py-4 px-4 min-h-[52px] bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 font-medium rounded-lg transition-all duration-200 text-zinc-50'
            >
              {layout.header.mobileMenu.ctaButton}
              <ChevronRight size={18} aria-hidden='true' />
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MobileMenuToggle;
