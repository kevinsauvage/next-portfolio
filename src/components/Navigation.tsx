'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import clsx from 'clsx';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#career', label: 'Career' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const Navigation: React.FC<{
  menuOpen: boolean;
  closeMenu: () => void;
}> = ({ closeMenu }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className='flex items-center' role='navigation' aria-label='Main navigation'>
      {/* Desktop Navigation */}
      <ul className='hidden lg:flex items-center gap-1'>
        {navItems.map(({ label, href }) => {
          const isActive = activeSection === href.substring(1);
          return (
            <li key={label}>
              <Link
                href={href}
                onClick={closeMenu}
                aria-label={`Go to ${label} section`}
                data-umami-event='header_nav_click'
                data-umami-event-label={label}
                className={clsx(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  'hover:scale-105 active:scale-95',
                  isActive
                    ? 'text-blue-400 bg-blue-400/10 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 hover:shadow-md'
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
