import Animation from '@/components/Animation/Animation';
import Button from '@/components/Button/Button';

import styles from './Contact.module.scss';

const Contact = () => (
  <div className={styles.contact}>
    <Animation
      duration={600}
      delay={200}
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(200px, 0px)' }}
    >
      <p className={styles.text}>
        Although I am not currently seeking new opportunities, I value building meaningful
        connections and expanding my network. Please feel free to reach out if you have any
        questions or just want to say hello. I&apos;ll do my best to respond as soon as possible.
        Thank you for your interest!
      </p>
    </Animation>
    <Animation
      duration={800}
      delay={200}
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: 'translate(0px, 200px)' }}
    >
      <Button label="Contact me!" onClick={() => window.open('mailto:kevinsauvage@outlook.com')} />
    </Animation>
  </div>
);

export default Contact;
