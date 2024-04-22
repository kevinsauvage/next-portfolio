import sections from '@/config/sections';

import NavItem from './NavItem/NavItem';

import styles from './Navigation.module.scss';

type NavigationProperties = { activeSectionId: string };

const Navigation: React.FC<NavigationProperties> = ({ activeSectionId }) => (
  <nav className={styles.Navigation}>
    <ul>
      {sections.slice(0, -1).map((section) => (
        <li key={section.id}>
          <NavItem
            id={section.id}
            icon={section.icon}
            label={section.id}
            activeSectionId={activeSectionId}
          />
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
