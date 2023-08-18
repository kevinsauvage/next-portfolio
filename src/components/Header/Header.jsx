import Logo from '../Logo/Logo';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Logo />
    <p className={styles.subtitle}>Consultant Developer</p>
    <p className={styles.content}>
      Developing performance-focused, inclusive web products that leave no one behind.
    </p>
  </header>
);

export default Header;
