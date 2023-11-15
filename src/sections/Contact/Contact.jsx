import ContactForm from '@/components/_scopes/form/ContactForm/ContactForm';
import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import sections from '@/config/sections';

const label = 'Contact Me';

const section = sections.find((data) => data.label === label);
const { icon, title, tagLevel } = section || {};

const Contact = () => (
  <SectionPresenter label={label}>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} tagLevel={tagLevel} />
      <ContactForm />
    </Section>
  </SectionPresenter>
);

export default Contact;
