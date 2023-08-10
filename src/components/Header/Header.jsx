import Logo from '../Logo/Logo';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Logo />
    <p className={styles.subtitle}>Consultant Developer</p>
    <p className={styles.content}>
      I specialize in creating captivating user experiences and delivering exceptional web
      solutions.
    </p>
  </header>
);

export default Header;
