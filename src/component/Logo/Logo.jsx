import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={styles.logo}>
    <Link href="/" passHref>
      <a>
        <p className={styles.logoName}>Kévin Sauvage.</p>
      </a>
    </Link>
  </div>
);

export default Logo;
