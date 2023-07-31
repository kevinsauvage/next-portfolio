import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={`${styles.logo}`}>
    <Link href="/">
      <p className={styles.logoName}>Kévin Sauvage.</p>
    </Link>
  </div>
);

export default Logo;
