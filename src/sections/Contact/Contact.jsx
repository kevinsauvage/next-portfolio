import Animation from '@/components/Animation/Animation';
import ContactForm from '@/components/ContactForm/ContactForm';

import styles from './Contact.module.scss';

const Contact = () => (
  <div className={styles.contact}>
    <Animation
      duration={600}
      delay={200}
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(200px, 0px)' }}
    >
      <p className={styles.text}>Kevinsauvage@outlook.com</p>
    </Animation>
    <ContactForm />
  </div>
);

export default Contact;
