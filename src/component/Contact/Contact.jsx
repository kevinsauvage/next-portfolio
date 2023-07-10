import { arrowbase } from '../../data/svg';
import useOnScreen from '../../hooks/useOnScreen';
import Button from '../Button/Button';
import Section from '../Section/Section';

import styles from './Contact.module.scss';

const Contact = () => {
  const reference = useOnScreen('fade-in', 'fade-in--active');

  return (
    <Section
      id="contact"
      className={styles.contact}
      icon={arrowbase}
      subtitle="Although I am not currently seeking new opportunities, I value building meaningful
  connections and expanding my network. Please feel free to reach out if you have any
  questions or just want to say hello. I'll do my best to respond as soon as possible.
  Thank you for your interest!"
      title="Get in touch"
    >
      <div ref={reference}>
        <Button
          label="Contact me!"
          onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
        />
      </div>
    </Section>
  );
};

export default Contact;
