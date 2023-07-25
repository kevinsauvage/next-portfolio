import ContactInfo from '@/components/ContactInfo/ContactInfo';
import Logo from '@/components/Logo/Logo';
import { scrollToSection } from '@/utils';

import styles from './Aside.module.scss';

const Aside = () => (
  <div className={styles.container}>
    <aside className={styles.aside}>
      <Logo />
      <p className={styles.subtitle}>
        I&apos;m Kévin Sauvage, a passionate front-end developer with 2 years of experience. I
        specialize in creating captivating user experiences and delivering exceptional web
        solutions.
      </p>
      <p className={styles.copyright}>&copy; Kévin Sauvage - {new Date().getFullYear()}</p>
      <ContactInfo className={styles.contactInfo} />
      <button className={styles.button} type="button" onClick={() => scrollToSection('Contact-Me')}>
        Hire me !
      </button>
    </aside>
  </div>
);

export default Aside;
