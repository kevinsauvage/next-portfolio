'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LucideSend } from 'lucide-react';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input';
import TextArea from '@/components/_scopes/form/TextArea';
import Button from '@/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useNotification } from '@/contexts/NotificationContext';
import { contactFormSchema, ContactFormValues } from '@/schemas/contact-form.schema';

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
        className='flex flex-col w-full'
        aria-label='Contact me'
      >
        <div className='space-y-8'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-1'>
                <FormLabel required>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='text'
                    placeholder='ex: John Doe'
                    aria-required='true'
                    aria-label='Full Name'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-1'>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='text'
                    placeholder='ex: johndoe@gmail.com'
                    aria-required='true'
                    aria-label='Email'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-1'>
                <FormLabel required>Message</FormLabel>
                <FormControl>
                  <TextArea
                    {...field}
                    placeholder='Share your thoughts or ask a question'
                    aria-required='true'
                    aria-label='Message'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className='mt-4 w-full md:w-fit'
            svg={<LucideSend role='img' size={18} aria-label='Send Message' />}
            label='Send Message'
            type='submit'
            title='Send Message'
            disabled={isSubmitting}
            loading={isSubmitting}
            variant='secondary'
            size='lg'
            data-umami-event='contact_form_submit'
          />
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
