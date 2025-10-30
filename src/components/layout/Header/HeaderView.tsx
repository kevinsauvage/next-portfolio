'use client';

import Link from 'next/link';

import Logo from '@/components/layout/Logo';
import Navigation from '@/components/layout/Navigation';
import Button from '@/components/ui/Button';
import { layout } from '@/config/content';

import clsx from 'clsx';
import { ChevronRight, Mail, MenuIcon, X } from 'lucide-react';

type HeaderViewProps = {
  menuOpen: boolean;
  isScrolled: boolean;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
  toggleMenu: () => void;
  closeMenu: () => void;
};

const HeaderView = ({
  menuOpen,
  isScrolled,
  mobileMenuRef,
  toggleMenu,
  closeMenu,
}: HeaderViewProps) => {
  return (
    <>
      <header
        className={clsx(
          'w-full fixed top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50'
            : 'bg-transparent border-b border-transparent'
        )}
        role='banner'
        aria-label='Main navigation'
      >
        <div className='flex justify-between m-auto items-center xl:container px-6 py-4'>
          <Logo />
          <Navigation closeMenu={closeMenu} menuOpen={menuOpen} />
          <div className='flex gap-3 items-center justify-end'>
            <Link href='#contact' className='hidden lg:block'>
              <Button
                svg={<Mail strokeWidth={1.5} size={18} aria-hidden='true' />}
                label={layout.header.ctaButton}
                size='md'
                variant='primary'
                data-umami-event='header_cta_contact'
                className='font-semibold'
              />
            </Link>
            <button
              className='lg:hidden p-3 rounded-md hover:bg-zinc-800/50 transition-colors relative z-50 min-w-[48px] min-h-[48px] flex items-center justify-center'
              onClick={toggleMenu}
              aria-label={
                menuOpen
                  ? layout.header.mobileMenu.closeButton
                  : layout.header.mobileMenu.openButton
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={28} strokeWidth={1.5} className='text-zinc-100' aria-hidden='true' />
              ) : (
                <MenuIcon
                  size={28}
                  strokeWidth={1.5}
                  className='text-zinc-100'
                  aria-hidden='true'
                />
              )}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div
          className='fixed inset-0 bg-black/95 backdrop-blur-lg z-[45] lg:hidden'
          onClick={closeMenu}
          onKeyDown={e => e.key === 'Escape' && closeMenu()}
          aria-hidden='true'
        >
          <div
            className='absolute right-0 top-0 h-full w-full max-w-sm bg-zinc-900 border-l border-zinc-800 animate-slide-in-left'
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            ref={mobileMenuRef}
            role='dialog'
            aria-modal='true'
            aria-label='Navigation menu'
          >
            <div className='flex flex-col h-full'>
              <div className='p-6 border-b border-zinc-800 flex items-center justify-between'>
                <div>
                  <h2 className='text-xl font-semibold text-zinc-100'>
                    {layout.header.mobileMenu.title}
                  </h2>
                  <p className='text-sm text-zinc-500 mt-1'>{layout.header.mobileMenu.subtitle}</p>
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
                      <span className='text-zinc-100 font-medium text-lg'>{label}</span>
                      <ChevronRight
                        size={20}
                        className='text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all'
                        aria-hidden='true'
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className='p-6 border-t border-zinc-800'>
                <Link
                  href='#contact'
                  onClick={closeMenu}
                  className='flex items-center justify-center gap-2 w-full py-4 px-4 min-h-[52px] bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium rounded-lg transition-all duration-200'
                >
                  {layout.header.mobileMenu.ctaButton}
                  <ChevronRight size={18} aria-hidden='true' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderView;
