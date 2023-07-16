import config from '@/config';
import { useGlobalContext } from '@/contexts/GlobalContext';
import IconCloseOutline from '@/svg/IconCloseOutline';
import IconMenu from '@/svg/IconMenu';

import Animation from '../Animation/Animation';
import ContactInfo from '../ContactInfo/ContactInfo';

import styles from './Nav.module.scss';

const Navigation = () => {
  const states = useGlobalContext();

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
          <Animation
            replay
            duration={400}
            iterationCount="1"
            timingFunction="ease-in-out"
            fillMode="forwards"
            animationKeyframes={['fadeIn', 'slide']}
            initialStyle={{ opacity: 0, transform: 'translate(100px, 0px)' }}
          >
            <div className={styles.close}>
              <button type="button" onClick={() => updateMenuOpen(!menuIsOpen)}>
                <IconCloseOutline />
              </button>
            </div>
          </Animation>
          <ul className={styles.list}>
            {config.sections.map((section, index) => (
              <li
                key={section.label}
                className={`${styles.item} ${activeSection === section.label ? styles.active : ''}`}
              >
                <Animation
                  replay
                  duration={200}
                  delay={index * 70}
                  iterationCount="1"
                  timingFunction="ease-in-out"
                  fillMode="forwards"
                  animationKeyframes={['slide', 'fadeIn']}
                  initialStyle={{ opacity: 0, transform: 'translate(200px, 0px)' }}
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
                </Animation>
              </li>
            ))}
          </ul>
          <ContactInfo replay />
        </div>
      </nav>

      <div className={`${styles.hamb}`}>
        <button type="button" onClick={() => updateMenuOpen(!menuIsOpen)}>
          <IconMenu />
        </button>
      </div>
    </>
  );
};

export default Navigation;
