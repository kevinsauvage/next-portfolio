import config from '@/config';
import { useGlobalContext } from '@/contexts/GlobalContext';
import IconCloseOutline from '@/svg/IconCloseOutline';
import IconMenu from '@/svg/IconMenu';

import ContactInfo from '../ContactInfo/ContactInfo';

import styles from './Nav.module.scss';

const Navigation = () => {
  const states = useGlobalContext();

  console.log('🚀 ~  file: Nav.jsx:13 ~  Navigation ~  states:', states);

  const { menuIsOpen, updateMenuOpen, scrollToSection, activeSection } = states;

  return (
    <>
      <nav className={`${styles.nav} ${menuIsOpen ? styles.open : ''}`}>
        {menuIsOpen && (
          <div
            className={styles.overlay}
            role="button"
            onClick={() => updateMenuOpen(false)}
            tabIndex={0}
            onKeyDown={(event) => event.key === 'Enter' && updateMenuOpen(false)}
          />
        )}
        <div className={styles.inner}>
          <ul className={styles.list}>
            {config.sections.map((section, index) => (
              <li
                key={section.label}
                style={{ animationDelay: `${index * 0.05}s` }}
                className={`${styles.item} ${activeSection === section.label ? styles.active : ''}`}
              >
                <button
                  type="button"
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
          <ContactInfo />
          <button
            type="button"
            className={styles.close}
            onClick={() => updateMenuOpen(!menuIsOpen)}
          >
            <IconCloseOutline />
          </button>
        </div>
      </nav>
      <button
        className={`${styles.hamb}`}
        type="button"
        onClick={() => updateMenuOpen(!menuIsOpen)}
      >
        <IconMenu />
      </button>
    </>
  );
};

export default Navigation;
