import Section from '@/components/_scopes/section/Section/Section';
import Button from '@/components/Button/Button';
import useOnScreen from '@/hooks/useOnScreen';

import styles from './Contact.module.scss';

const Contact = ({ ...rest }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');

  return (
    <Section {...rest}>
      <div ref={reference} className={styles.contact}>
        <p className={styles.text}>
          Although I am not currently seeking new opportunities, I value building meaningful
          connections and expanding my network. Please feel free to reach out if you have any
          questions or just want to say hello. I&apos;ll do my best to respond as soon as possible.
          Thank you for your interest!
        </p>
        <Button
          label="Contact me!"
          onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
        />
      </div>
    </Section>
  );
};

export default Contact;
