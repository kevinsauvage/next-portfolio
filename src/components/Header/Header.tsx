import ContactInfo from '../ContactInfo/ContactInfo';
import Logo from '../Logo/Logo';

import styles from './Header.module.scss';

type Properties = {
  isScrollingUp: boolean;
  isScrollingDown: boolean;
};

const Header = ({ isScrollingUp, isScrollingDown }: Properties) => (
  <header
    className={`${styles.header} ${isScrollingUp && styles.isScrollingUp} ${
      isScrollingDown && styles.isScrollingDown
    }`}
  >
    <Logo />
    <ContactInfo />
  </header>
);

export default Header;
