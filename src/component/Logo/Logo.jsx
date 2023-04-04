import Image from 'next/image';
import Link from 'next/link';

import portrait from '../../images/portrait.png';
import GradientBorder from '../GradientBorder/GradientBorder';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={styles.logo}>
    <Link href="/" passHref>
      <a>
        <GradientBorder radius="50%">
          <Image
            className={styles.logoImg}
            src={portrait.src}
            alt="profile"
            width={60}
            height={60}
          />
        </GradientBorder>
      </a>
    </Link>
    <p className={styles.logoName}>Kévin S.</p>
  </div>
);

export default Logo;
