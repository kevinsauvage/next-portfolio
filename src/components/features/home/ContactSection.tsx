import dynamic from 'next/dynamic';

import EmailCopyButton from '@/components/features/contact/EmailCopyButton';
import ContactInfo from '@/components/shared/ContactInfo';
import GoogleReCaptchaProviderWrapper from '@/components/shared/GoogleReCaptchaProviderWrapper';
import MeshGradient from '@/components/shared/MeshGradient';
import SpinnerLoader from '@/components/shared/SpinnerLoader';
import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import { UMAMI_EVENTS } from '@/lib/analytics-events';
import { getPublicEnv } from '@/lib/env';

import { Mail, MapPin } from 'lucide-react';

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
        className='py-12 md:py-20 max-w-4xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 relative'
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

            <div className='flex flex-col items-center gap-4'>
              <div className='flex flex-wrap items-center justify-center gap-3'>
                <a
                  href={`mailto:${sections.contact.email}`}
                  data-umami-event={UMAMI_EVENTS.OUTBOUND_LINK_CLICK}
                  data-umami-event-url={`mailto:${sections.contact.email}`}
                  data-umami-event-location='contact'
                  className='inline-flex min-h-[48px] items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-3 font-mono text-sm text-zinc-100 transition-colors hover:border-primary-600 hover:text-primary-300'
                >
                  <Mail size={18} aria-hidden='true' />
                  {sections.contact.email}
                </a>
                <EmailCopyButton email={sections.contact.email} />
              </div>
              <p className='inline-flex items-center gap-2 text-sm text-zinc-400'>
                <MapPin size={16} aria-hidden='true' className='text-zinc-500' />
                {sections.contact.location}
              </p>
            </div>

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
