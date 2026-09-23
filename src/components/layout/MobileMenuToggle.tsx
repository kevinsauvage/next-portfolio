'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import { BodySmall, H4 } from '@/components/ui/Typography';
import { layout } from '@/config/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { UMAMI_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';
import { ChevronRight, MenuIcon, X } from 'lucide-react';

const sectionIdFromHref = (href: string) => href.replace(/^\/#/, '');
const SECTION_IDS = layout.header.navigation.items.map(({ href }) => sectionIdFromHref(href));

const MobileMenuToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const mobileMenuRef = useFocusTrap(menuOpen, closeMenu);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(previous => !previous);

  const mobileMenuContent = menuOpen && (
    <div className='fixed inset-0 z-[45] lg:hidden'>
      <button
        type='button'
        className='fixed inset-0 w-full h-full bg-black/95 backdrop-blur-lg cursor-default'
        onClick={closeMenu}
        aria-label='Close navigation menu'
      />
      <dialog
        open
        className='fixed right-0 top-0 bottom-0 w-full max-w-sm bg-zinc-900 border-l border-zinc-800 animate-slide-in-left m-0 p-0 max-h-none'
        ref={mobileMenuRef as React.RefObject<HTMLDialogElement>}
        aria-label='Navigation menu'
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

          <ul className='flex-1 overflow-y-auto p-4'>
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
                    aria-label={`Go to ${label} section`}
                    aria-current={isActive ? 'true' : undefined}
                    data-umami-event={UMAMI_EVENTS.NAV_SECTION_CLICK}
                    data-umami-event-location='mobile'
                    data-umami-event-section={label}
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

          <div className='p-6 border-t border-zinc-800 space-y-4'>
            <div className='flex justify-center'>
              <ContactInfo size={22} eventPrefix='mobile_menu' />
            </div>
            <Link
              href={layout.header.resumeHref}
              target='_blank'
              rel='noopener noreferrer'
              onClick={closeMenu}
              data-umami-event={UMAMI_EVENTS.CTA_RESUME_CLICK}
              data-umami-event-location='mobile_menu'
              className='flex items-center justify-center gap-2 w-full py-4 px-4 min-h-[52px] bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 font-medium rounded-lg transition-all duration-200 text-zinc-50'
            >
              {layout.header.mobileMenu.ctaButton}
              <ChevronRight size={18} aria-hidden='true' />
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );

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

      {mounted && mobileMenuContent && createPortal(mobileMenuContent, document.body)}
    </>
  );
};

export default MobileMenuToggle;
