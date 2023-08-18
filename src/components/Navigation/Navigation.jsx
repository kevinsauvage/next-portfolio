import NavItem from '@/components/Navigation/NavItem/NavItem';
import sections from '@/config/sections';

import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.Navigation}>
    <ul>
      {sections.map((section) => (
        <NavItem section={section} key={section.label} />
      ))}
    </ul>
  </nav>
);

export default Navigation;
