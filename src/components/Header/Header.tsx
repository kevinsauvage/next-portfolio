import ContactInfo from '../ContactInfo/ContactInfo';
import Logo from '../Logo/Logo';

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
    <Logo />
    <ContactInfo />
  </header>
);

export default Header;
