import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={`${styles.logo}`}>
    <Link href="/" title="Scroll to top">
      <strong className={styles.logoName}>Kévin Sauvage</strong>
    </Link>
  </div>
);

export default Logo;
