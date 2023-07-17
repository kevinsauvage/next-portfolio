import Navigation from '@/components/Nav/Nav';

import FloatingNav from '../FloatingNav/FloatingNav';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Navigation />
    <FloatingNav />
    <ThemeSwitcher />
  </header>
);

export default Header;
