'use client';

import Link from 'next/link';

import AnimatedContainer from '@/components/AnimatedContainer';
import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';

import NavItem from './NavItem';

import { LucideSend } from 'lucide-react';

type NavigationProperties = { activeSectionId: string; isOpen: boolean };

const Navigation: React.FC<NavigationProperties> = ({ activeSectionId, isOpen }) => {
  const { closeMenu } = useGlobalContext();

  return (
    <AnimatedContainer
      className={`fixed inset-0 z-50 p-3 flex flex-col justify-center gap-8 w-full max-h-dvh h-screen bg-slate-900 transition-transform will-change-transform lg:static lg:flex-row lg:items-center lg:gap-4 lg:translate-x-0 lg:bg-transparent lg:w-fit lg:h-fit
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      Tag="nav"
      from={{ delay: 0.6, opacity: 0, y: -50 }}
      to={{ delay: 0.6, duration: 0.2, opacity: 1, stagger: { amount: 0.1 }, y: 0 }}
      triggerClassName=".animated-navigation-item"
    >
      <ul className="flex-col items-center gap-8 flex lg:flex-row lg:gap-4">
        {sections.slice(0, -1).map((section) => (
          <li
            key={section.id}
            className="animated-navigation-item capitalize font-medium whitespace-nowrap list-decimal list-inside marker:text-blue-500 marker:text-2xl opacity-0 lg:marker:text-xl"
          >
            <NavItem id={section.id} label={section.id} activeSectionId={activeSectionId} />
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className={`flex items-center justify-center font-semibold font-serif rounded p-3 w-full overflow-hidden opacity-0 gap-2 text-white border border-blue-900 hover:bg-blue-800 bg-gradient-to-r from-blue-600 to-violet-600 animated-navigation-item text-2xl max-w-xs mx-auto lg:text-lg lg:p-2`}
        aria-label="Get in Touch - Scroll to the contact section"
        onClick={closeMenu}
      >
        Contact me
        <LucideSend size={20} />
      </Link>
    </AnimatedContainer>
  );
};

export default Navigation;
