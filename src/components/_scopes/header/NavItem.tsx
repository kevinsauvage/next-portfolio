'use client';

import Link from 'next/link';

import { useGlobalContext } from '@/contexts/GlobalContext';

type NavItemProperties = {
  id: string;
  label: string;
  activeSectionId: string;
};

const NavItem: React.FC<NavItemProperties> = ({ id, label, activeSectionId }) => {
  const { closeMenu } = useGlobalContext();
  return (
    <Link
      href={`#${id}`}
      className={`text-2xl ${id === activeSectionId ? 'text-blue-500' : ''} md:text-xl lg:text-lg`}
      replace
      aria-label={label}
      onClick={closeMenu}
    >
      {label}
    </Link>
  );
};

export default NavItem;
