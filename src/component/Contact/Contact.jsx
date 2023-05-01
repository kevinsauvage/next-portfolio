import Button from '../Button/Button';
import Section from '../Section/Section';
import Title from '../Title/Title';

import styles from './Contact.module.scss';

const Contact = () => (
  <Section id="contact" className={styles.contact}>
    <Title>Get in touch</Title>
    <p className={styles.subtitle}>
      Although I am not currently seeking new opportunities, I value building meaningful connections
      and expanding my network. Please feel free to reach out if you have any questions or just want
      to say hello. I&apos;ll do my best to respond as soon as possible. Thank you for your
      interest!
    </p>

    <Button
      className={styles.button}
      label="Contact me!"
      variant="outlined"
      onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
    />
  </Section>
);

export default Contact;
