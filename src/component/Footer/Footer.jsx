import Image from 'next/image';
import Link from 'next/link';

import portrait from '../../images/portrait.png';
import GradientBorder from '../GradientBorder/GradientBorder';

import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.Footer}>
    <Link href="/#app" passHref>
      <a>
        <GradientBorder radius="50%">
          <Image
            className={styles.Footer__img}
            src={portrait.src}
            alt="portrait of kevin sauvage"
            width={60}
            height={60}
          />
        </GradientBorder>
      </a>
    </Link>
    <p className={styles.Footer__name}>Kévin S.</p>
    <p className={styles.Footer__copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
  </footer>
);

export default Footer;
