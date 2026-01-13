'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { sendMail } from '@/actions/send-mail';
import { useNotification } from '@/contexts/NotificationContext';

import ContactFormView from './ContactFormView';

// Client-side type (no Zod import needed)
export interface ContactFormValues {
  fullName: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const notification = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<ContactFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const gRecaptchaToken = executeRecaptcha ? await executeRecaptcha('contactMessage') : '';

      const result = await sendMail({
        ...data,
        captcha: gRecaptchaToken,
      });

      if (result.success) {
        form.reset();
        notification.success(
          "Your message has been sent successfully. I'll get back to you as soon as possible."
        );
      } else if (result.fieldErrors) {
        // Set server-side validation errors on the form
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (field in data) {
            form.setError(field as keyof ContactFormValues, { message });
          }
        }
      } else {
        notification.error('An error occurred while sending your message. Please try again later.');
      }
    } catch {
      notification.error('An error occurred while sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <ContactFormView form={form} isSubmitting={isSubmitting} onSubmit={onSubmit} />;
};

export default ContactForm;
