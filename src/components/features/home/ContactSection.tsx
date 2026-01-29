import dynamic from 'next/dynamic';

import ContactInfo from '@/components/shared/ContactInfo';
import GoogleReCaptchaProviderWrapper from '@/components/shared/GoogleReCaptchaProviderWrapper';
import MeshGradient from '@/components/shared/MeshGradient';
import SpinnerLoader from '@/components/shared/SpinnerLoader';
import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import { getPublicEnv } from '@/lib/env';

const ContactForm = dynamic(() => import('@/components/features/contact/ContactForm'), {
  loading: () => (
    <div className='flex justify-center items-center min-h-[300px]'>
      <SpinnerLoader />
    </div>
  ),
});

const ContactSection: React.FC = () => {
  const publicEnv = getPublicEnv();
  const recaptchaSiteKey = publicEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <div className='relative rounded-none border-0 border-t border-zinc-700 text-center'>
      <MeshGradient />
      <Section
        id='contact'
        className='px-6 py-12 md:py-20 max-w-4xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 relative'
        spacing='md'
      >
        <GoogleReCaptchaProviderWrapper reCaptchaKey={recaptchaSiteKey}>
          <div className='w-full relative z-10 space-y-16'>
            <SectionHeader
              overline={sections.contact.overline}
              title={sections.contact.title}
              description={sections.contact.description}
              align='center'
            />

            <ContactForm />

            <div className='mt-8 flex flex-col items-center gap-4'>
              <p className='text-sm text-zinc-400'>Or connect with me on social media</p>
              <ContactInfo size={24} eventPrefix='contact' />
            </div>
          </div>
        </GoogleReCaptchaProviderWrapper>
      </Section>
    </div>
  );
};

export default ContactSection;
