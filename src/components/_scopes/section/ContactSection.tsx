import BoxWithBackground from '@/components/BoxWithBackground';
import { getDictionary } from '@/dictionaries/dictionaries';

import ContactForm from '../form/ContactForm';

import Section from './_components/Section';
import SectionDescription from './_components/SectionDescription';
import SectionHeader from './_components/SectionHeader';
import SectionTitle from './_components/SectionTitle';

const ContactSection: React.FC<{
  lang: string;
}> = async ({ lang }) => {
  const t = await getDictionary(lang);

  return (
    <BoxWithBackground
      className="bg-zinc-900 rounded-none bg-gradient-to-t from-zinc-950 from-30% to-zinc-900/90 border-0 border-t"
      backgroundConfig={{ scale: 0.3, strokeWidth: 1.1 }}
    >
      <Section
        id={t.shared.header.nav.contact.toLowerCase()}
        className="p-6 max-w-xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 md:p-0"
      >
        <SectionHeader>
          <SectionTitle>{t.home.contact.title}</SectionTitle>
          <SectionDescription>{t.home.contact.description}</SectionDescription>
        </SectionHeader>
        <ContactForm translations={t.home.contact.form} />
      </Section>
    </BoxWithBackground>
  );
};

export default ContactSection;
