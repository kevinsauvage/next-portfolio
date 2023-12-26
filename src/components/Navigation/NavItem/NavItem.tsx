import Link from 'next/link';

import styles from './NavItem.module.scss';

type NavItemProperties = {
  id: string;
  icon: React.ReactNode;
  label: string;
  activeSectionId: string;
};

const NavItem: React.FC<NavItemProperties> = ({ id, label, activeSectionId, icon }) => (
  <Link
    href={`#${id}`}
    className={`${styles.NavItem} ${id === activeSectionId ? styles.active : ''}`}
    replace
  >
    <span className={styles.icon}>{icon}</span>
    <span className={styles.label}>{label}</span>
  </Link>
);

export default NavItem;
