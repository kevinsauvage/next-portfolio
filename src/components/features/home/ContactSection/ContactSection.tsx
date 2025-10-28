'use client';

import ContactForm from '@/components/features/contact/ContactForm';
import BoxWithBackground from '@/components/shared/BoxWithBackground';
import GoogleReCaptchaProviderWrapper from '@/components/shared/GoogleReCaptchaProviderWrapper';
import Section, { SectionHeader } from '@/components/ui/Section';
import { BodySmall, H5 } from '@/components/ui/Typography';
import { gapSpacing, iconSizes, radius, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
import { MessageSquare, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <BoxWithBackground
      className='bg-zinc-900 rounded-none bg-gradient-to-t from-zinc-950 from-30% to-zinc-900/90 border-0 border-t'
      backgroundConfig={{ scale: 0.3, strokeWidth: 3 }}
    >
      <Section
        id='contact'
        className='px-6 py-12 md:py-20 max-w-4xl min-h-dvh flex flex-col justify-center items-center scroll-m-0 relative'
        spacing='md'
      >
        <div className={clsx('w-full relative z-10', stackSpacing.xl)}>
          <SectionHeader
            overline='Contact'
            title="Let's build something great"
            description="Have a project or challenge? I'd love to hear about it. Let's discuss how we can build, improve, or innovate together."
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
                <H5>Quick Response</H5>
              </div>
              <BodySmall>I typically respond within 24 hours during weekdays</BodySmall>
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
                <H5>Direct Contact</H5>
              </div>
              <BodySmall>Fill out the form below and I&apos;ll get back to you soon</BodySmall>
            </div>
          </div>

          <GoogleReCaptchaProviderWrapper>
            <ContactForm />
          </GoogleReCaptchaProviderWrapper>
        </div>
      </Section>
    </BoxWithBackground>
  );
};

export default ContactSection;
