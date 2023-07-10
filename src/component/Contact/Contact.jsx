import { arrowbase } from '../../data/svg';
import Button from '../Button/Button';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import styles from './Contact.module.scss';

const Contact = () => (
  <Section id="contact" className={styles.contact}>
    <UpTitle text="Contact" icon={arrowbase} />
    <Title
      className={styles.title}
      subtitle="  Although I am not currently seeking new opportunities, I value building meaningful
        connections and expanding my network. Please feel free to reach out if you have any
        questions or just want to say hello. I'll do my best to respond as soon as possible.
        Thank you for your interest!"
    >
      Get in touch
    </Title>
    <Button label="Contact me!" onClick={() => window.open('mailto:kevinsauvage@outlook.com')} />
  </Section>
);

export default Contact;
