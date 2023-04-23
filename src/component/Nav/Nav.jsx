import { IoMdCloseCircle } from 'react-icons/io';
import Link from 'next/link';

import { aboutIcon, arrowbase, homeIcon, projects, skillsIcon } from '../../data/svg';

import styles from './Nav.module.scss';

const Navigation = ({ setMenuIsOpen, menuIsOpen }) => {
  const links = [
    { hash: '', icon: homeIcon, text: 'HOME' },
    { hash: '#about', icon: aboutIcon, text: 'ABOUT' },
    { hash: '#skills', icon: skillsIcon, text: 'SKILLS' },
    { hash: '#projects', icon: projects, text: 'PROJECTS' },
    { hash: '#contact', icon: arrowbase, text: 'CONTACT' },
  ];

  return (
    <nav className={`${styles.nav} ${menuIsOpen ? styles.open : ''}`}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.hash} className={`${styles.item} ${menuIsOpen ? styles.open : ''}`}>
            <Link href={`/${link.hash}`} onClick={() => link.to()} passHref>
              <a>
                {link.icon} {link.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <IoMdCloseCircle
        className={styles.close}
        onClick={() => setMenuIsOpen((previous) => !previous)}
      />
    </nav>
  );
};

export default Navigation;
