'use client';

import BoxWithBackground from '@/components/BoxWithBackground';
import GoogleReCaptchaProviderWrapper from '@/components/GoogleReCaptchaProviderWrapper';

import ContactForm from '../form/ContactForm';

import Section from './_components/Section';

import { MessageSquare, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <BoxWithBackground
      className='bg-zinc-900 rounded-none bg-gradient-to-t from-zinc-950 from-30% to-zinc-900/90 border-0 border-t'
      backgroundConfig={{ scale: 0.3, strokeWidth: 3 }}
    >
      <Section
        id='contact'
        className='px-6 py-12 md:py-20 max-w-4xl min-h-dvh flex flex-col justify-center items-center scroll-m-0'
      >
        <div className='w-full space-y-16'>
          {/* Header Section */}
          <div className='space-y-8 text-center'>
            <p className='text-sm font-medium text-blue-400 tracking-wider uppercase'>Contact</p>
            <h2 className='text-4xl md:text-6xl font-bold'>
              <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
                Let&apos;s build something great
              </span>
            </h2>
            <p className='text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto'>
              Got a project in mind? Let&apos;s talk about it—new builds, improvements, or just a
              chat.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='p-2 bg-blue-500/10 rounded-lg'>
                  <MessageSquare size={20} className='text-blue-400' aria-hidden='true' />
                </div>
                <h3 className='text-lg font-semibold text-zinc-100'>Quick Response</h3>
              </div>
              <p className='text-zinc-400 text-sm'>
                I typically respond within 24 hours during weekdays
              </p>
            </div>

            <div className='p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='p-2 bg-purple-500/10 rounded-lg'>
                  <Send size={20} className='text-purple-400' aria-hidden='true' />
                </div>
                <h3 className='text-lg font-semibold text-zinc-100'>Direct Contact</h3>
              </div>
              <p className='text-zinc-400 text-sm'>
                Fill out the form below and I&apos;ll get back to you soon
              </p>
            </div>
          </div>

          {/* Form */}
          <GoogleReCaptchaProviderWrapper>
            <ContactForm />
          </GoogleReCaptchaProviderWrapper>
        </div>
      </Section>
    </BoxWithBackground>
  );
};

export default ContactSection;
