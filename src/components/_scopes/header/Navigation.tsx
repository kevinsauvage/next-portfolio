'use client';

import Link from 'next/link';

import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';

import NavItem from './NavItem';

import { LucideSend } from 'lucide-react';

type NavigationProperties = { activeSectionId: string; isOpen: boolean };

const Navigation: React.FC<NavigationProperties> = ({ activeSectionId, isOpen }) => {
  const { closeMenu } = useGlobalContext();

  return (
    <nav
      className={`fixed inset-0 z-50 p-3 flex flex-col justify-center gap-8 w-full max-h-dvh h-screen bg-slate-900 lg:static lg:flex-row lg:items-center lg:gap-4 lg:translate-x-0 lg:bg-transparent lg:w-fit lg:h-fit
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <ul className="flex-col items-center gap-8 flex lg:flex-row lg:gap-4">
        {sections.slice(0, -1).map((section) => (
          <li
            key={section.id}
            className="animated-navigation-item capitalize font-medium whitespace-nowrap list-decimal list-inside marker:text-blue-500 marker:text-2xl  lg:marker:text-xl"
          >
            <NavItem id={section.id} label={section.id} activeSectionId={activeSectionId} />
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className="flex items-center whitespace-nowrap justify-center w-full gap-2 p-2 font-semibold font-serif text-lg text-white rounded border border-blue-700  bg-blue-600 hover:bg-blue-900"
        aria-label="Get in Touch - Scroll to the contact section"
        onClick={closeMenu}
      >
        Contact me
        <LucideSend size={20} />
      </Link>
    </nav>
  );
};

export default Navigation;
