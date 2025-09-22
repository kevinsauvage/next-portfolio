'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/routing';

import clsx from 'clsx';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

const languages = [
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
];

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const dropdownReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const handleClick = (language: string) => {
    router.push(language + pathname);
    router.refresh();
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((previous) => !previous);

  return (
    <div
      className={clsx('relative inline-block text-left ml-4 z-50', className)}
      ref={dropdownReference}
    >
      <div className="relative z-50">
        <button
          type="button"
          className="flex items-center justify-center w-full rounded-md border uppercase border-zinc-700 shadow-sm px-3 py-2 bg-zinc-900 bg-opacity-50 text-sm font-medium text-zinc-50 hover:bg-zinc-900 focus:outline-none focus:ring"
          id="language-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          {locale}
          <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5" aria-hidden="true" strokeWidth={1} />
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
              'z-40 overflow-hidden fixed bottom-0 right-0 top-0 h-dvh w-full shadow-lg bg-zinc-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-t border-zinc-800 flex flex-col justify-end',
              'lg:absolute lg:rounded-md lg:origin-top-right lg:bottom-auto lg:w-fit lg:min-w-56 lg:mt-2 lg:ring-1 lg:ring-zinc-700 lg:ring-opacity-50 lg:divide-y lg:divide-zinc-100 lg:h-fit lg:top-full',
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu"
          >
            <div className="overflow-hidden border-t border-zinc-700 lg:border-none" role="menu">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleClick(language.code)}
                  type="button"
                  role="menuitem"
                  className={clsx(
                    locale === language.code
                      ? 'bg-zinc-900 text-zinc-200 cursor-default'
                      : 'text-zinc-100 bg-zinc-950',
                    'group flex items-center w-full p-6 text-lg font-semibold hover:bg-zinc-900 hover:text-zinc-50',
                    'md:text-sm md:p-3',
                  )}
                >
                  <span className="flex items-center">
                    {language.code === locale && (
                      <CheckIcon className="mr-2 text-zinc-200 text-2xl" aria-hidden="true" />
                    )}
                    {language.name}
                  </span>
                  <span className="ml-auto text-2xl">{language.flag}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
