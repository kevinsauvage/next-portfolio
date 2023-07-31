import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { scrollToSection } from '@/utils';

import styles from './Nav.module.scss';

const Navigation = () => {
  const { menuIsOpen, updateMenuOpen, activeSection } = useGlobalContext();

  return (
    <nav>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li
            key={section.label}
            className={`${styles.item} ${menuIsOpen ? 'fade-in slide' : ''} ${
              activeSection === section.label ? styles.active : ''
            }`}
          >
            <button
              type="button"
              aria-label="Close menu"
              disabled={activeSection === section.label}
              onClick={() => {
                updateMenuOpen(false);
                scrollToSection(section.label);
              }}
            >
              {section.icon} <p>{section.label}</p>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
