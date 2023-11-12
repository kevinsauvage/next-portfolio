import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={`${styles.logo}`}>
    <Link href="/" title="Scroll to top">
      <b className={styles.logoName}>Kévin Sauvage.</b>
    </Link>
  </div>
);

export default Logo;
