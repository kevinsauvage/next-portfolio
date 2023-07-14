import Section from '@/components/_scopes/section/Section/Section';
import Button from '@/components/Button/Button';
import useOnScreen from '@/hooks/useOnScreen';

const Contact = ({ ...rest }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');

  return (
    <Section {...rest}>
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
