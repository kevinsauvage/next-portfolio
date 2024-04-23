'use client';
import Link from 'next/link';

import { useGlobalContext } from '@/contexts/GlobalContext';

import styles from './NavItem.module.scss';

type NavItemProperties = {
  id: string;
  label: string;
  activeSectionId: string;
};

const NavItem: React.FC<NavItemProperties> = ({ id, label, activeSectionId }) => {
  const { toggleOpenOnMobile } = useGlobalContext();
  return (
    <Link
      href={`#${id}`}
      className={`${styles.NavItem} ${id === activeSectionId ? styles.active : ''}`}
      replace
      aria-label={label}
      onClick={toggleOpenOnMobile}
    >
      <span className={styles.label}>{label}</span>
    </Link>
  );
};

export default NavItem;
