import Popover from '@/components/Popover/Popover';
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
          <li
            key={section.label}
            className={`${styles.item} ${activeSection === section.label && styles.active}`}
          >
            <Popover text={section.label}>
              <button
                type="button"
                aria-label={section.label}
                onClick={() => scrollToSection(section.label)}
              >
                {section.icon}
              </button>
            </Popover>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FloatingNav;
