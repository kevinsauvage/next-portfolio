import Image from 'next/image';
import Link from 'next/link';

import portrait from '../../images/portrait.png';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={styles.logo}>
    <Link href="/" passHref>
      <a>
        <Image
          className={styles.logoImg}
          src={portrait.src}
          alt="portrait of kevin sauvage"
          width={60}
          height={60}
        />
      </a>
    </Link>
    <p className={styles.logoName}>Kévin S.</p>
  </div>
);

export default Logo;
