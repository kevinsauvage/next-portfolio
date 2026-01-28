'use client';

import { useState } from 'react';

import { sendMail } from '@/actions/send-mail';
import { useNotification } from '@/contexts/NotificationContext';

import ContactFormView from './ContactFormView';

// Client-side type (no Zod import needed)
export interface ContactFormValues {
  fullName: string;
  email: string;
  message: string;
}

// Extend Window interface for grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const ContactForm = () => {
  const notification = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<ContactFormValues>({
    fullName: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: ContactFormValues = {
      fullName: (formData.get('fullName') as string) || '',
      email: (formData.get('email') as string) || '',
      message: (formData.get('message') as string) || '',
    };

    try {
      // Get ReCaptcha token
      let captchaToken = '';
      const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (typeof window !== 'undefined' && window.grecaptcha && recaptchaSiteKey) {
        await new Promise<void>(resolve => {
          window.grecaptcha!.ready(() => {
            resolve();
          });
        });
        captchaToken = await window.grecaptcha.execute(recaptchaSiteKey, {
          action: 'contactMessage',
        });
      }

      const result = await sendMail({
        ...data,
        captcha: captchaToken,
      });

      if (result.success) {
        setFormValues({ fullName: '', email: '', message: '' });
        e.currentTarget.reset();
        notification.success(
          "Your message has been sent successfully. I'll get back to you as soon as possible."
        );
      } else if (result.fieldErrors) {
        setErrors(result.fieldErrors);
      } else {
        notification.error('An error occurred while sending your message. Please try again later.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      notification.error('An error occurred while sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <ContactFormView
      formValues={formValues}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
};

export default ContactForm;
