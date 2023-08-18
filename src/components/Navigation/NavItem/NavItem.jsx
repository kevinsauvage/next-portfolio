'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { scrollToSection } from '@/utils';

import styles from './NavItem.module.scss';

const NavItem = ({ section }) => {
  const { activeSection } = useGlobalContext();

  return (
    <li className={styles.item}>
      <button
        className={`${styles.button} ${activeSection === section.label && styles.active}`}
        type="button"
        aria-label={section.label}
        onClick={() => {
          scrollToSection(section.label);
        }}
      >
        <span className={styles.icon}>{section.icon}</span>
        <p className={styles.label}>{section.label}</p>
      </button>
    </li>
  );
};

export default NavItem;
