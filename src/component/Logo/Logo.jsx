import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={`${styles.logo} fade-in--active`}>
    <Link href="/" passHref>
      <a>
        <p className={styles.logoName}>Kévin Sauvage.</p>
      </a>
    </Link>
  </div>
);

export default Logo;
