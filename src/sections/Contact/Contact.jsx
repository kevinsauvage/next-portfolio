import Animation from '@/components/Animation/Animation';
import ContactForm from '@/components/ContactForm/ContactForm';

const Contact = () => (
  <Animation
    duration={600}
    delay={200}
    animationKeyframes={['slide', 'fade-in']}
    initialStyle={{ opacity: 0, transform: 'translate(0px, 50px)' }}
  >
    <ContactForm />
  </Animation>
);

export default Contact;
