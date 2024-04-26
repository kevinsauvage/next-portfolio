import Link from 'next/link';

import renderLetters from '@/utils/renderLetters';

import AnimatedContainer from '../AnimatedContainer/AnimatedContainer';

import styles from './Logo.module.scss';

const Logo = () => (
  <AnimatedContainer
    className={styles.logo}
    Tag="h1"
    from={{ ease: 'sine.out', opacity: 0, y: 50 }}
    to={{
      duration: 0.3,
      ease: 'sine.out',
      opacity: 1,
      stagger: {
        amount: 0.5,
        each: 0.1,
      },
      y: 0,
    }}
    triggerClassName=".char"
  >
    <Link href="/" title="Scroll to top">
      <strong className={styles.logoName}>{renderLetters(' Kévin Sauvage')}</strong>
    </Link>
  </AnimatedContainer>
);

export default Logo;
