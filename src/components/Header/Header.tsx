import Link from 'next/link';

import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import NavigationPresenter from '../Navigation/NavigationPresenter';

import styles from './Header.module.scss';

type Properties = {
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isAtTop: boolean;
};

const Header = ({ isScrollingUp, isScrollingDown, isAtTop }: Properties) => (
  <header
    className={`${styles.header} ${isScrollingUp && styles.isScrollingUp} ${
      isScrollingDown && styles.isScrollingDown
    } ${isAtTop && styles.isAtTop}`}
  >
    <Container className={styles.container}>
      <Logo />
      <div className={styles.wrapper}>
        <div className={styles.navigation}>
          <NavigationPresenter />
        </div>
        <Link
          href="/#contact"
          className={styles.button}
          aria-label="Get in Touch - Scroll to the contact section"
        >
          Contact me
        </Link>
      </div>
    </Container>
  </header>
);

export default Header;
