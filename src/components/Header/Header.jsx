import FloatingNav from '../FloatingNav/FloatingNav';
import Menu from '../Menu/Menu';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Menu />
    <FloatingNav />
    <ThemeSwitcher className={`${styles.ThemeSwitcher} slide fade-in`} />
  </header>
);

export default Header;
