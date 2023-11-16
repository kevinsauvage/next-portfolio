import ContactInfo from '../ContactInfo/ContactInfo';
import Logo from '../Logo/Logo';

import styles from './Header.module.scss';

type Properties = {
  isScrolled: boolean;
};

const Header = ({ isScrolled }: Properties) => (
  <header className={`${styles.header} ${isScrolled && styles.isScrolled}`}>
    <Logo />
    <ContactInfo />
  </header>
);

export default Header;
