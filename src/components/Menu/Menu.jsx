import { useGlobalContext } from '@/contexts/GlobalContext';
import IconCloseOutline from '@/svg/IconCloseOutline';
import IconMenu from '@/svg/IconMenu';

import ContactInfo from '../ContactInfo/ContactInfo';
import Navigation from '../Nav/Nav';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import styles from './Menu.module.scss';

const Menu = () => {
  const { menuIsOpen, updateMenuOpen } = useGlobalContext();

  return (
    <>
      <div className={`${styles.menu} ${menuIsOpen ? styles.open : ''}`}>
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
          <div className={`${styles.header} ${menuIsOpen ? 'fade-in' : ''}`}>
            <ThemeSwitcher />
            <div className={`${styles.close} ${menuIsOpen ? 'slide' : ''} `}>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => updateMenuOpen(!menuIsOpen)}
              >
                <IconCloseOutline />
              </button>
            </div>
          </div>
          <Navigation />
          <ContactInfo replay />
        </div>
      </div>
      <div className={`${styles.hamb}`}>
        <button aria-label="Open menu" type="button" onClick={() => updateMenuOpen(!menuIsOpen)}>
          <IconMenu />
        </button>
      </div>
    </>
  );
};

export default Menu;
