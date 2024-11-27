'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { setServerCookie } from '@/actions/cookies';

import clsx from 'clsx';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div
      className={clsx('relative inline-block text-left ml-4 z-50', className)}
      ref={dropdownReference}
    >
      <div>
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
        <div
          className="origin-top-right overflow-hidden absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-zinc-950 ring-1 ring-zinc-300 ring-opacity-50 divide-y divide-zinc-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="overflow-hidden" role="none">
            {languages.map((language) => (
              <Link href={`/${language.code}`} key={language.code}>
                <button
                  className={`${
                    lang === language.code ? 'bg-zinc-900 text-zinc-200' : 'text-zinc-100'
                  } group flex items-center w-full px-4 py-2 text-sm hover:bg-zinc-800 hover:text-zinc-50 `}
                  role="menuitem"
                >
                  {language.code === lang && (
                    <CheckIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                  {language.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
