import ContactForm from '@/components/features/contact/ContactForm';
import EmailCopyButton from '@/components/features/contact/EmailCopyButton';
import ContactInfo from '@/components/shared/ContactInfo';
import GoogleReCaptchaProviderWrapper from '@/components/shared/GoogleReCaptchaProviderWrapper';
import MeshGradient from '@/components/shared/MeshGradient';
import Reveal from '@/components/shared/Reveal';
import Section, { SectionHeader } from '@/components/ui/Section';
import { sections } from '@/config/content';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';
import { getPublicEnv } from '@/lib/env';

import { Mail, MapPin } from 'lucide-react';

/**
 * The form renders inline, and outside the scroll reveal, on purpose.
 *
 * `next/dynamic` made React stream it into a `<div hidden>`: the fields were
 * `display: none` — and absent from the accessibility tree — until hydration.
 * `Section`'s reveal then put them behind an `opacity: 0` ancestor until the
 * visitor scrolled past them. Either one makes the labels fail the "every field
 * has a visible label" check in a real browser, and both hide the form from
 * assistive tech at load. The decorative blocks below keep their entrance
 * animation; the form does not.
 */
const ContactSection = () => {
  const recaptchaSiteKey = getPublicEnv().NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <div className='relative rounded-none border-0 border-t border-zinc-700 text-center'>
      <MeshGradient />
      <Section
        id='contact'
        className='py-12 md:py-20 max-w-4xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 relative'
        spacing='md'
        reveal={false}
      >
        <div className='w-full relative z-10 space-y-16'>
          <Reveal>
            <SectionHeader
              overline={sections.contact.overline}
              title={sections.contact.title}
              description={sections.contact.description}
              align='center'
            />
          </Reveal>

          <Reveal>
            <div className='flex flex-col items-center gap-4'>
              <div className='flex flex-wrap items-center justify-center gap-3'>
                <a
                  href={`mailto:${sections.contact.email}`}
                  data-analytics-event={ANALYTICS_EVENTS.OUTBOUND_LINK_CLICK}
                  data-analytics-url={`mailto:${sections.contact.email}`}
                  data-analytics-location='contact'
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
          </Reveal>

          <GoogleReCaptchaProviderWrapper reCaptchaKey={recaptchaSiteKey}>
            <ContactForm reCaptchaKey={recaptchaSiteKey} />
          </GoogleReCaptchaProviderWrapper>

          <Reveal>
            <div className='mt-8 flex flex-col items-center gap-4'>
              <p className='text-sm text-zinc-400'>{sections.contact.socialLead}</p>
              <ContactInfo size={24} eventPrefix='contact' />
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
};

export default ContactSection;
