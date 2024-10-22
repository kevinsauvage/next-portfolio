'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import ContactForm from '@/components/_scopes/form/ContactForm';
import Section from '@/components/_scopes/section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle';
import sections, { Sections } from '@/config/sections';

const label = 'Contact Me';

const section = sections.find((data) => data.label === label) as Sections[0];
const { title, position } = section || {};

const Contact = () => (
  <Section id={section.id}>
    <SectionTitle title={title} position={position} />
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  </Section>
);

export default Contact;
