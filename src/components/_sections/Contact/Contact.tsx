import ContactForm from '@/components/_scopes/form/ContactForm/ContactForm';
import Section from '@/components/_scopes/section/Section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import sections, { Sections } from '@/config/sections';

const label = 'Contact Me';

const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

const Contact = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <ContactForm />
  </Section>
);

export default Contact;
