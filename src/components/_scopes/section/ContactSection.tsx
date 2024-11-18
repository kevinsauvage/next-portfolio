import BoxWithBackground from '@/components/BoxWithBackground';

import ContactForm from '../form/ContactForm';

import Section from './Section';
import SectionDescription from './SectionDescription';
import SectionHeader from './SectionHeader';
import SectionTitle from './SectionTitle';

const ContactSection: React.FC = () => {
  return (
    <BoxWithBackground className="bg-zinc-900 rounded-none">
      <Section
        id="contact"
        className="p-6 max-w-xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 md:p-0"
      >
        <SectionHeader>
          <SectionTitle>Contact me</SectionTitle>
          <SectionDescription>
            Whether you’re looking to build a new website, improve your existing platform, or bring
            a unique project to life, I’m here to help.
          </SectionDescription>
        </SectionHeader>
        <ContactForm />
      </Section>
    </BoxWithBackground>
  );
};

export default ContactSection;