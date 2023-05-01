import Image from 'next/image';
import Link from 'next/link';

import portrait from '../../images/me.jpg';
import FadeIn from '../FadeIn/FadeIn';

import styles from './Logo.module.scss';

const Logo = () => (
  <FadeIn>
    <div className={styles.logo}>
      <Link href="/" passHref>
        <a>
          <Image
            className={styles.logoImg}
            src={portrait.src}
            alt="portrait of kevin sauvage"
            width={45}
            height={45}
          />
        </a>
      </Link>
      <p className={styles.logoName}>Kévin S.</p>
    </div>
  </FadeIn>
);

export default Logo;
