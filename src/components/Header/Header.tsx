import ContactInfo from '../ContactInfo/ContactInfo';
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
    <Logo />
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <NavigationPresenter />
      </div>
      <ContactInfo />
    </div>
  </header>
);

export default Header;
