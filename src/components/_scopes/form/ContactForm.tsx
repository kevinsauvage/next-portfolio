'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input';
import TextArea from '@/components/_scopes/form/TextArea';
import Button from '@/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useNotification } from '@/contexts/NotificationContext';
import type { ContactFormValues } from '@/schemas/contact-form.schema';
import { contactFormSchema } from '@/schemas/contact-form.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { LucideSend } from 'lucide-react';

const ContactForm = () => {
  const notification = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
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
      } else {
        notification.error('An error occurred while sending your message. Please try again later.');
      }
    } catch {
      notification.error('An error occurred while sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col w-full bg-zinc-900/30 border border-zinc-800 rounded-lg p-8'
        aria-label='Contact form'
        noValidate
      >
        <div className='sr-only' role='status' aria-live='polite' aria-atomic='true'>
          {isSubmitting ? 'Sending message...' : ''}
        </div>
        <div className='space-y-6'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field, fieldState }) => (
              <FormItem className='flex flex-col space-y-2'>
                <FormLabel required>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='text'
                    placeholder='ex: John Doe'
                    aria-required='true'
                    aria-invalid={fieldState.invalid}
                  />
                </FormControl>
                {fieldState.error && (
                  <p id='fullName-error' className='text-sm text-rose-400' role='alert'>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field, fieldState }) => (
              <FormItem className='flex flex-col space-y-2'>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='ex: johndoe@gmail.com'
                    aria-required='true'
                    aria-invalid={fieldState.invalid}
                  />
                </FormControl>
                {fieldState.error && (
                  <p id='email-error' className='text-sm text-rose-400' role='alert'>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='message'
            render={({ field, fieldState }) => (
              <FormItem className='flex flex-col space-y-2'>
                <FormLabel required>Message</FormLabel>
                <FormControl>
                  <TextArea
                    {...field}
                    placeholder='Share your thoughts or ask a question'
                    aria-required='true'
                    aria-invalid={fieldState.invalid}
                  />
                </FormControl>
                {fieldState.error && (
                  <p id='message-error' className='text-sm text-rose-400' role='alert'>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button
            className='mt-2'
            svg={<LucideSend role='img' size={18} aria-hidden='true' />}
            label={isSubmitting ? 'Sending...' : 'Send Message'}
            type='submit'
            title='Send Message'
            disabled={isSubmitting}
            loading={isSubmitting}
            variant='primary'
            size='md'
            data-umami-event='contact_form_submit'
            aria-live='polite'
          />
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
