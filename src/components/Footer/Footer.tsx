import Link from 'next/link';

import ContactInfo from '../ContactInfo/ContactInfo';
import Container from '../Container/Container';

import styles from './Footer.module.scss';

const Footer = () => (
  <Container>
    <footer className={styles.Footer}>
      <Link href="/" aria-label="Go to Home page" className={styles.linkHome}>
        Kévin Sauvage
      </Link>

      <ContactInfo />
    </footer>
  </Container>
);

export default Footer;
