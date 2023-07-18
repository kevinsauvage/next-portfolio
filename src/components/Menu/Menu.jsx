import { useGlobalContext } from '@/contexts/GlobalContext';
import IconCloseOutline from '@/svg/IconCloseOutline';
import IconMenu from '@/svg/IconMenu';

import Animation from '../Animation/Animation';
import ContactInfo from '../ContactInfo/ContactInfo';
import Navigation from '../Nav/Nav';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import styles from './Menu.module.scss';

const Menu = () => {
  const states = useGlobalContext();

  const { menuIsOpen, updateMenuOpen } = states;

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
          <Animation
            replay
            duration={400}
            iterationCount="1"
            timingFunction="ease-in-out"
            fillMode="forwards"
            animationKeyframes={['fadeIn', 'slide']}
            initialStyle={{ opacity: 0, transform: 'translate(100px, 0px)' }}
          >
            <div className={styles.header}>
              <ThemeSwitcher />
              <div className={styles.close}>
                <button type="button" onClick={() => updateMenuOpen(!menuIsOpen)}>
                  <IconCloseOutline />
                </button>
              </div>
            </div>
          </Animation>
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
