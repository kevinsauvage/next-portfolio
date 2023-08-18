import Header from '@/components//Header/Header';
import FloatingNav from '@/components//Navigation/Navigation';
import Animation from '@/components/Animation/Animation';
import ContactInfo from '@/components/ContactInfo/ContactInfo';

import styles from './Aside.module.scss';

const Aside = () => (
  <Animation initial={{ opacity: 0 }} animate={{ opacity: 1 }} tag="aside" className={styles.aside}>
    <Header />
    <FloatingNav />
    <ContactInfo />
  </Animation>
);

export default Aside;
