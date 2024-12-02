'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { setServerCookie } from '@/actions/cookies';

import clsx from 'clsx';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

const languages = [
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
];

const LanguageSwitcher = ({ lang, className }: { lang: string; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownReference.current && !dropdownReference.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setServerCookie('i18nlang', lang, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  }, [lang]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div
      className={clsx('relative inline-block text-left ml-4 z-50', className)}
      ref={dropdownReference}
    >
      <div className="relative z-50">
        <button
          type="button"
          className="flex items-center justify-center w-full rounded-md border uppercase border-zinc-700 shadow-sm px-4 py-2 bg-zinc-900 bg-opacity-50 text-sm font-medium text-zinc-50 hover:bg-zinc-900 focus:outline-none focus:ring"
          id="language-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          {lang}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" strokeWidth={1} />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-zinc-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50"
            onClick={toggleDropdown}
            onKeyDown={toggleDropdown}
            role="button"
            tabIndex={0}
            aria-label="Close"
          />
          <div
            className={clsx(
              'z-50 overflow-hidden fixed bottom-0 right-0 w-full shadow-lg bg-zinc-950 border-t border-zinc-800',
              'md:absolute md:rounded-md md:origin-top-right md:bottom-auto md:w-fit md:min-w-56 md:mt-2 md:ring-1 md:ring-zinc-300 md:ring-opacity-50 md:divide-y md:divide-zinc-100',
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
          >
            <div className="overflow-hidden" role="menu">
              {languages.map((language) => (
                <Link href={`/${language.code}`} key={language.code} role="menuitem">
                  <button
                    className={clsx(
                      lang === language.code ? 'bg-zinc-900 text-zinc-200' : 'text-zinc-100',
                      'group flex items-center w-full p-6 text-lg font-semibold hover:bg-zinc-800 hover:text-zinc-50',
                      'md:text-sm md:p-3',
                    )}
                  >
                    <span className="flex items-center">
                      {language.code === lang && (
                        <CheckIcon className="mr-2 text-zinc-200 text-2xl" aria-hidden="true" />
                      )}
                      {language.name}
                    </span>
                    <span className="ml-auto text-2xl">{language.flag}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
