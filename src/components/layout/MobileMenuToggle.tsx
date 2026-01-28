'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

import ContactInfo from '@/components/shared/ContactInfo';
import { BodySmall, H4 } from '@/components/ui/Typography';
import { layout } from '@/config/content';
import { colors } from '@/design-system/tokens';
import { useFocusTrap } from '@/hooks/useFocusTrap';

import clsx from 'clsx';
import { ChevronRight, MenuIcon, X } from 'lucide-react';

const MobileMenuToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mobileMenuRef = useFocusTrap(menuOpen);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const mobileMenuContent = menuOpen && (
    <div className='fixed inset-0 z-[45] lg:hidden'>
      <button
        type='button'
        className='fixed inset-0 w-full h-full bg-black/95 backdrop-blur-lg cursor-default'
        onClick={closeMenu}
        aria-label='Close navigation menu'
      />
      <div
        className='fixed right-0 top-0 bottom-0 w-full max-w-sm bg-zinc-900 border-l border-zinc-800 animate-slide-in-left'
        ref={mobileMenuRef as React.RefObject<HTMLDivElement>}
        role='dialog'
        aria-modal='true'
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
              <X size={24} strokeWidth={1.5} className={colors.text.muted} aria-hidden='true' />
            </button>
          </div>

          <ul className='flex-1 overflow-y-auto p-4'>
            {layout.header.navigation.items.map(({ label, href }, index) => (
              <li key={label} style={{ animationDelay: `${index * 50}ms` }}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  aria-label={`Go to ${label} section`}
                  data-umami-event='header_nav_click'
                  data-umami-event-label={label}
                  className='flex items-center justify-between p-4 mb-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-primary-500/50 hover:bg-zinc-800 active:bg-zinc-700 transition-all duration-200 group min-h-[56px]'
                >
                  <BodySmall className={clsx(colors.text.primary, 'font-medium text-lg')}>
                    {label}
                  </BodySmall>
                  <ChevronRight
                    size={20}
                    className={clsx(
                      colors.text.muted,
                      'group-hover:translate-x-1 transition-all',
                      colors.status.hover.info.replace('hover:', 'group-hover:')
                    )}
                    aria-hidden='true'
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className='p-6 border-t border-zinc-800 space-y-4'>
            <div className='flex justify-center'>
              <ContactInfo size={22} eventPrefix='mobile_menu' />
            </div>
            <Link
              href='#contact'
              onClick={closeMenu}
              className={clsx(
                'flex items-center justify-center gap-2 w-full py-4 px-4 min-h-[52px] bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 font-medium rounded-lg transition-all duration-200',
                colors.text.primary
              )}
            >
              {layout.header.mobileMenu.ctaButton}
              <ChevronRight size={18} aria-hidden='true' />
            </Link>
          </div>
        </div>
      </div>
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
          <X size={28} strokeWidth={1.5} className={colors.text.secondary} aria-hidden='true' />
        ) : (
          <MenuIcon
            size={28}
            strokeWidth={1.5}
            className={colors.text.secondary}
            aria-hidden='true'
          />
        )}
      </button>

      {mounted && mobileMenuContent && createPortal(mobileMenuContent, document.body)}
    </>
  );
};

export default MobileMenuToggle;
