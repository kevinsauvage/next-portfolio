import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={`${styles.logo}`}>
    <Link href="/">
      <b className={styles.logoName}>Kévin Sauvage.</b>
    </Link>
  </div>
);

export default Logo;
