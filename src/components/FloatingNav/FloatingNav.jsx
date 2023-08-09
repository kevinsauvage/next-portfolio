import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { scrollToSection } from '@/utils';

import styles from './FloatingNav.module.scss';

const FloatingNav = () => {
  const { activeSection } = useGlobalContext();

  return (
    <nav className={styles.nav}>
      <ul className={`${styles.list} `}>
        {sections.map((section) => (
          <li key={section.label} className={`${styles.item} fade-in`}>
            <button
              className={`${styles.button} ${activeSection === section.label && styles.active}`}
              type="button"
              aria-label={section.label}
              onClick={() => scrollToSection(section.label)}
            >
              <span className={styles.icon}>{section.icon}</span>
              <p className={styles.label}>{section.label}</p>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FloatingNav;
