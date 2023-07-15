import Section from '@/components/_scopes/section/Section/Section';
import Animation from '@/components/Animation/Animation';
import Button from '@/components/Button/Button';
import useOnScreen from '@/hooks/useOnScreen';

import styles from './Contact.module.scss';

const Contact = ({ ...rest }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');

  return (
    <Section {...rest}>
      <div ref={reference} className={styles.contact}>
        <Animation
          duration={400}
          delay={0}
          iterationCount="1"
          timingFunction="ease-in-out"
          fillMode="forwards"
          animationKeyframes={['slide', 'fadeIn']}
          initialStyle={{ opacity: 0, transform: 'translate(500px, 0px)' }}
        >
          <p className={styles.text}>
            Although I am not currently seeking new opportunities, I value building meaningful
            connections and expanding my network. Please feel free to reach out if you have any
            questions or just want to say hello. I&apos;ll do my best to respond as soon as
            possible. Thank you for your interest!
          </p>
        </Animation>
        <Animation
          duration={400}
          delay={0}
          iterationCount="1"
          timingFunction="ease-in-out"
          fillMode="forwards"
          animationKeyframes={['slide', 'fadeIn']}
          initialStyle={{ opacity: 0, transform: 'translate(200px, 200px)' }}
        >
          <Button
            label="Contact me!"
            onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
          />
        </Animation>
      </div>
    </Section>
  );
};

export default Contact;
