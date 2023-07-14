import Link from 'next/link';

import ContactInfo from '@/components/ContactInfo/ContactInfo';
import Logo from '@/components/Logo/Logo';

import styles from './Aside.module.scss';

const Aside = () => (
  <aside className={styles.aside}>
    <Logo />
    <p className={styles.text}>
      I&apos;m Kévin Sauvage, a passionate front-end developer with 2 years of experience. I
      specialize in creating captivating user experiences and delivering exceptional web solutions.
    </p>

    <ContactInfo />
    <div className={styles.button}>
      <Link href="/#Contact">Hire me !</Link>
    </div>
  </aside>
);

export default Aside;
