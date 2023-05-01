import { IoMdCloseCircle } from 'react-icons/io';
import Link from 'next/link';

import { aboutIcon, arrowbase, projects, skillsIcon } from '../../data/svg';
import FadeIn from '../FadeIn/FadeIn';

import styles from './Nav.module.scss';

const Navigation = ({ setMenuIsOpen, menuIsOpen }) => {
  const links = [
    { hash: '#about', icon: aboutIcon, text: 'About' },
    { hash: '#projects', icon: projects, text: 'Work' },
    { hash: '#skills', icon: skillsIcon, text: 'Skills' },
    { hash: '#contact', icon: arrowbase, text: 'Contact' },
  ];

  return (
    <nav className={`${styles.nav} ${menuIsOpen ? styles.open : ''}`}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.hash} className={`${styles.item} ${menuIsOpen ? styles.open : ''}`}>
            <FadeIn>
              <Link href={`/${link.hash}`} onClick={() => link.to()} passHref>
                <a>
                  {link.icon} {link.text}
                </a>
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>
      <FadeIn>
        <IoMdCloseCircle
          className={styles.close}
          onClick={() => setMenuIsOpen((previous) => !previous)}
        />
      </FadeIn>
    </nav>
  );
};

export default Navigation;
