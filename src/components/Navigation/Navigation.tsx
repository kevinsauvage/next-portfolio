'use client';

import Link from 'next/link';

import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';

import NavItem from './NavItem/NavItem';

import styles from './Navigation.module.scss';

type NavigationProperties = { activeSectionId: string; isOpen: boolean };

const Navigation: React.FC<NavigationProperties> = ({ activeSectionId, isOpen }) => {
  const { toggleOpenOnMobile } = useGlobalContext();

  return (
    <nav className={`${styles.Navigation} ${isOpen && styles.open}`}>
      <ul>
        {sections.slice(0, -1).map((section) => (
          <li key={section.id}>
            <NavItem id={section.id} label={section.id} activeSectionId={activeSectionId} />
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className={styles.button}
        aria-label="Get in Touch - Scroll to the contact section"
        onClick={toggleOpenOnMobile}
      >
        Contact me
      </Link>
    </nav>
  );
};

export default Navigation;
