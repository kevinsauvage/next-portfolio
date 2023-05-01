import Image from 'next/image';
import Link from 'next/link';

import portrait from '../../images/me.jpg';
import FadeIn from '../FadeIn/FadeIn';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={styles.logo}>
    <Link href="/" passHref>
      <a>
        <FadeIn>
          <Image
            className={styles.logoImg}
            src={portrait.src}
            alt="portrait of kevin sauvage"
            width={45}
            height={45}
          />
        </FadeIn>
      </a>
    </Link>
    <FadeIn>
      <p className={styles.logoName}>Kévin S.</p>
    </FadeIn>
  </div>
);

export default Logo;
