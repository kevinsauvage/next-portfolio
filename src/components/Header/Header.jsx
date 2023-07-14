import Navigation from '@/components/Nav/Nav';

import FloatingNav from '../FloatingNav/FloatingNav';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Navigation />
    <FloatingNav />
  </header>
);

export default Header;
