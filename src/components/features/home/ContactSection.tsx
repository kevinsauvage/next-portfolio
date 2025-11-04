import ContactForm from '@/components/features/contact/ContactForm';
import ContactInfo from '@/components/shared/ContactInfo';
import GoogleReCaptchaProviderWrapper from '@/components/shared/GoogleReCaptchaProviderWrapper';
import MeshGradient from '@/components/shared/MeshGradient';
import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import { stackSpacing } from '@/design-system/tokens';
import { getPublicEnv } from '@/lib/env';

import clsx from 'clsx';

const ContactSection: React.FC = () => {
  const publicEnv = getPublicEnv();
  return (
    <div className='relative rounded-none border-0 border-t border-zinc-700 text-center'>
      <MeshGradient />
      <Section
        id='contact'
        className='px-6 py-12 md:py-20 max-w-4xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 relative'
        spacing='md'
      >
        <div className={clsx('w-full relative z-10', stackSpacing.xl)}>
          <SectionHeader
            overline={sections.contact.overline}
            title={sections.contact.title}
            description={sections.contact.description}
            align='center'
          />

          <GoogleReCaptchaProviderWrapper reCaptchaKey={publicEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <ContactForm />
          </GoogleReCaptchaProviderWrapper>

          <div className='mt-8 flex flex-col items-center gap-4'>
            <p className='text-sm text-zinc-400'>Or connect with me on social media</p>
            <ContactInfo size={24} eventPrefix='contact' />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContactSection;
