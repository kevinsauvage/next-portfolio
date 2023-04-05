import Image from 'next/image';
import Link from 'next/link';

import portrait from '../../images/portrait.png';
import GradientBorder from '../GradientBorder/GradientBorder';
import Section from '../Section/Section';

import styles from './Footer.module.scss';

const Footer = () => (
  <Section className={styles.FooterContainer}>
    <footer className={styles.Footer}>
      <Link href="/#app" passHref>
        <a>
          <GradientBorder radius="50%">
            <Image
              className={styles.Footer__img}
              src={portrait.src}
              alt="portrait"
              width={60}
              height={60}
            />
          </GradientBorder>
        </a>
      </Link>
      <p className={styles.Footer__name}>Kévin S.</p>
      <p className={styles.Footer__copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  </Section>
);

export default Footer;