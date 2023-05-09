import Link from 'next/link';

import {
  aboutIcon,
  arrowbase,
  closeIcon,
  experienceIcon,
  projectsIcon,
  servicesIcon,
  skillsIcon,
} from '../../data/svg';
import FadeIn from '../FadeIn/FadeIn';

import styles from './Nav.module.scss';

const Navigation = ({ setMenuIsOpen, menuIsOpen }) => {
  const links = [
    { hash: '#about', icon: aboutIcon, text: 'About' },
    { hash: '#services', icon: servicesIcon, text: 'Services' },
    { hash: '#experience', icon: experienceIcon, text: 'Experience' },
    { hash: '#projects', icon: projectsIcon, text: 'Projects' },
    { hash: '#what', icon: skillsIcon, text: 'What' },
    { hash: '#contact', icon: arrowbase, text: 'Contact' },
  ];

  return (
    <nav className={`${styles.nav} ${menuIsOpen ? styles.open : ''}`}>
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={link.hash} className={`${styles.item} ${menuIsOpen ? styles.open : ''}`}>
            <FadeIn delay={`${index * 0.05}s`}>
              <Link href={`/${link.hash}`} passHref>
                <a>
                  {link.icon} {link.text}
                </a>
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.close}
        onClick={() => setMenuIsOpen((previous) => !previous)}
      >
        {closeIcon}
      </button>
    </nav>
  );
};

export default Navigation;
