import Header from '@/components//Header/Header';
import FloatingNav from '@/components//Navigation/Navigation';
import ContactInfo from '@/components/ContactInfo/ContactInfo';

import styles from './Aside.module.scss';

const Aside = () => (
  <aside className={styles.aside}>
    <Header />
    <FloatingNav />
    <ContactInfo />
  </aside>
);

export default Aside;
