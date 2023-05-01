import { RiMenu4Fill } from 'react-icons/ri';

import Container from '../Container/Container';
import FadeIn from '../FadeIn/FadeIn';
import Logo from '../Logo/Logo';
import Navigation from '../Nav/Nav';

import HeaderFunction from './HeaderFunction';

import styles from './Header.module.scss';

const Header = () => {
  const { links, scrolled, setMenuIsOpen, menuIsOpen } = HeaderFunction();

  return (
    <div className={`${styles.Header} ${scrolled ? styles.scrolled : ''}`}>
      <Container classname={styles.container}>
        <Logo />
        <Navigation links={links} setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />
        <FadeIn>
          <RiMenu4Fill
            className={styles.hamb}
            onClick={() => setMenuIsOpen((previous) => !previous)}
          />
        </FadeIn>
      </Container>
    </div>
  );
};

export default Header;
