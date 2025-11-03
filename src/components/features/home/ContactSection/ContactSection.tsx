import ContactForm from '@/components/features/contact/ContactForm';
import BoxWithBackground from '@/components/shared/BoxWithBackground';
import GoogleReCaptchaProviderWrapper from '@/components/shared/GoogleReCaptchaProviderWrapper';
import MeshGradient from '@/components/shared/MeshGradient';
import Section, { SectionHeader } from '@/components/ui/Section';
import { BodySmall, H4 } from '@/components/ui/Typography';
import { sections } from '@/config/content';
import { gapSpacing, iconSizes, radius, stackSpacing } from '@/design-system/tokens';
import { getPublicEnv } from '@/lib/env';

import clsx from 'clsx';
import { MessageSquare, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const publicEnv = getPublicEnv();
  return (
    <BoxWithBackground
      className='bg-zinc-900 rounded-none bg-gradient-to-t from-zinc-950 from-30% to-zinc-900/90 border-0 border-t'
      backgroundConfig={{ scale: 0.3, strokeWidth: 3 }}
    >
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

          <div className={clsx('grid grid-cols-1 md:grid-cols-2', gapSpacing.md)}>
            <div
              className={clsx(
                'p-6 bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10',
                radius.md
              )}
            >
              <div className={clsx('flex items-center mb-3', gapSpacing.xs)}>
                <div className={clsx('p-2 bg-blue-500/10', radius.md)}>
                  <MessageSquare
                    size={iconSizes.md}
                    className='text-blue-400 transition-transform hover:rotate-12'
                    strokeWidth={1.5}
                    aria-hidden='true'
                  />
                </div>
                <H4>{sections.contact.features.quickResponse.title}</H4>
              </div>
              <BodySmall>{sections.contact.features.quickResponse.description}</BodySmall>
            </div>

            <div
              className={clsx(
                'p-6 bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10',
                radius.md
              )}
            >
              <div className={clsx('flex items-center mb-3', gapSpacing.xs)}>
                <div className={clsx('p-2 bg-purple-500/10', radius.md)}>
                  <Send
                    size={iconSizes.md}
                    className='text-purple-400 transition-transform hover:rotate-12'
                    strokeWidth={1.5}
                    aria-hidden='true'
                  />
                </div>
                <H4>{sections.contact.features.directContact.title}</H4>
              </div>
              <BodySmall>{sections.contact.features.directContact.description}</BodySmall>
            </div>
          </div>

          <GoogleReCaptchaProviderWrapper reCaptchaKey={publicEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <ContactForm />
          </GoogleReCaptchaProviderWrapper>
        </div>
      </Section>
    </BoxWithBackground>
  );
};

export default ContactSection;
