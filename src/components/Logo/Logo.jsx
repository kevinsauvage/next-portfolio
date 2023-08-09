import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={`${styles.logo}`}>
    <Link href="/">
      <h1 className={styles.logoName}>Kévin Sauvage.</h1>
    </Link>
  </div>
);

export default Logo;
