import Link from 'next/link';

import FadeIn from '../FadeIn/FadeIn';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={styles.logo}>
    <FadeIn>
      <Link href="/" passHref>
        <a>
          <p className={styles.logoName}>Kévin S.</p>
        </a>
      </Link>
    </FadeIn>
  </div>
);

export default Logo;
