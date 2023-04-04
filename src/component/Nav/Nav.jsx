import { IoMdCloseCircle } from 'react-icons/io';
import Link from 'next/link';

import styles from './Nav.module.scss';

const Navigation = ({ setMenuIsOpen, menuIsOpen }) => {
  const links = [
    { hash: '#app', text: 'HOME' },
    { hash: '#about', text: 'ABOUT' },
    { hash: '#skills', text: 'SKILLS' },
    { hash: '#projects', text: 'PROJECTS' },
    { hash: '#contact', text: 'CONTACT' },
  ];

  return (
    <nav className={`${styles.nav} ${menuIsOpen ? styles.open : ''}`}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.hash} className={`${styles.item} ${menuIsOpen ? styles.open : ''}`}>
            <Link href={`/${link.hash}`} onClick={() => link.to()}>
              {link.text}
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
