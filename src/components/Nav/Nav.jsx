import sections from '@/config/sections';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { scrollToSection } from '@/utils';

import Animation from '../Animation/Animation';

import styles from './Nav.module.scss';

const Navigation = () => {
  const states = useGlobalContext();

  const { updateMenuOpen, activeSection } = states;

  return (
    <nav>
      <ul className={styles.list}>
        {sections.map((section, index) => (
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
                aria-label="Close menu"
                disabled={activeSection === section.label}
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
    </nav>
  );
};

export default Navigation;
