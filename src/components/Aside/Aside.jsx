import ContactInfo from '@/components/ContactInfo/ContactInfo';

import Header from '../Header/Header';

import styles from './Aside.module.scss';

const Aside = () => (
  <aside className={styles.aside}>
    <Header />
    <ContactInfo />
  </aside>
);

export default Aside;
