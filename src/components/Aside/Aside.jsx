import ContactInfo from '@/components/ContactInfo/ContactInfo';

import FloatingNav from '../FloatingNav/FloatingNav';
import Header from '../Header/Header';

import styles from './Aside.module.scss';

const Aside = () => (
  <aside className={styles.aside}>
    <Header />
    <FloatingNav />

    <ContactInfo />
  </aside>
);

export default Aside;
