'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Button from './Button';
import Logo from './Logo';
import Navigation from './Navigation';

import clsx from 'clsx';
import { ChevronRight,Mail, MenuIcon, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  console.log('🟩🟪🟦-->  ~ Header ~ isScrolled:', isScrolled);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'w-full fixed top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className='flex justify-between m-auto items-center xl:container px-6 py-4'>
          <Logo />
          <Navigation closeMenu={() => setMenuOpen(false)} menuOpen={menuOpen} />
          <div className='flex gap-4 items-center justify-end'>
            <Link href='#contact' className='hidden lg:block'>
              <Button
                svg={<Mail strokeWidth={1.5} size={18} aria-hidden='true' />}
                label='Contact'
                size='md'
                variant='primary'
                data-umami-event='header_cta_contact'
              />
            </Link>
            <button
              className='lg:hidden p-2 rounded-md hover:bg-zinc-800/50 transition-colors relative z-50'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={28} strokeWidth={1.5} className='text-zinc-100' />
              ) : (
                <MenuIcon size={28} strokeWidth={1.5} className='text-zinc-100' />
              )}
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/95 backdrop-blur-lg z-[45] lg:hidden transition-opacity duration-300',
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={clsx(
            'absolute right-0 top-0 h-full w-full max-w-sm bg-zinc-900 border-l border-zinc-800 transition-transform duration-300 ease-out',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className='flex flex-col h-full'>
            {/* Mobile Menu Header */}
            <div className='p-6 border-b border-zinc-800'>
              <h2 className='text-xl font-semibold text-zinc-100'>Navigation</h2>
              <p className='text-sm text-zinc-500 mt-1'>Explore my portfolio</p>
            </div>

            {/* Mobile Menu Items */}
            <ul className='flex-1 overflow-y-auto p-4'>
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#portfolio', label: 'Portfolio' },
                { href: '#career', label: 'Career' },
                { href: '#testimonials', label: 'Testimonials' },
                { href: '#contact', label: 'Contact' },
              ].map(({ label, href }, index) => (
                <li key={label} style={{ animationDelay: `${index * 50}ms` }}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-label={`Go to ${label} section`}
                    data-umami-event='header_nav_click'
                    data-umami-event-label={label}
                    className='flex items-center justify-between p-4 mb-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-blue-500/50 hover:bg-zinc-800 transition-all duration-200 group'
                  >
                    <span className='text-zinc-100 font-medium text-lg'>{label}</span>
                    <ChevronRight
                      size={20}
                      className='text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all'
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Footer */}
            <div className='p-6 border-t border-zinc-800'>
              <Link
                href='#contact'
                onClick={() => setMenuOpen(false)}
                className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200'
              >
                Get in Touch
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
