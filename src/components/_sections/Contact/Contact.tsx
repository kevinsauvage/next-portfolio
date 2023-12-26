import ContactForm from '@/components/_scopes/form/ContactForm/ContactForm';
import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import sections, { Sections } from '@/config/sections';

const label = 'Contact Me';

type Section = {
  icon: string;
  title: string;
  tagLevel: 'h2' | 'h3';
};

const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title } = section || {};

const Contact = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} id="contact" />
      <SectionTitle title={title} />
      <ContactForm />
    </Section>
  </SectionPresenter>
);

export default Contact;
