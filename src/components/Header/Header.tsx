import AnimatedContainer from '../AnimatedContainer/AnimatedContainer';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import NavigationPresenter from '../Navigation/NavigationPresenter';

import styles from './Header.module.scss';

type Properties = {
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isAtTop: boolean;
  children: React.ReactNode;
};

const Header = ({ children, isScrollingUp, isScrollingDown, isAtTop }: Properties) => (
  <header
    className={`${styles.header} ${isScrollingUp && styles.isScrollingUp} ${
      isScrollingDown && styles.isScrollingDown
    } ${isAtTop && styles.isAtTop}`}
  >
    <Container className={styles.container}>
      <AnimatedContainer
        from={{ opacity: 0, y: 150 }}
        to={{
          duration: 0.2,
          opacity: 1,
          y: 0,
        }}
        style={{
          opacity: 0,
          overflow: 'hidden',
          willChange: 'opacity, transform',
        }}
      >
        <Logo />
      </AnimatedContainer>
      <NavigationPresenter />
      {children}
    </Container>
  </header>
);

export default Header;
