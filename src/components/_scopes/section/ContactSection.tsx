import BoxWithBackground from '@/components/BoxWithBackground';

import ContactForm from '../form/ContactForm';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

const ContactSection: React.FC = () => {
  return (
    <BoxWithBackground
      className='bg-zinc-900 rounded-none bg-gradient-to-t from-zinc-950 from-30% to-zinc-900/90 border-0 border-t'
      backgroundConfig={{ scale: 0.3, strokeWidth: 3 }}
    >
      <Section
        id='contact'
        className='p-6 max-w-xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 md:p-0'
      >
        <SectionHeader>
          <SectionTitle>Let's Build Something Amazing Together</SectionTitle>
          <SectionDescription>
            Ready to transform your ideas into exceptional digital experiences? I'm always excited
            to discuss new projects, collaborations, or just chat about web development.
          </SectionDescription>
        </SectionHeader>
        <ContactForm />
      </Section>
    </BoxWithBackground>
  );
};

export default ContactSection;
