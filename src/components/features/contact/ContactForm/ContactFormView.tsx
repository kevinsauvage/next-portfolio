'use client';

import type { UseFormReturn } from 'react-hook-form';

import Button from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import type { ContactFormValues } from '@/schemas/contact-form.schema';

import { LucideSend } from 'lucide-react';

type ContactFormViewProps = {
  form: UseFormReturn<ContactFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: ContactFormValues) => Promise<void> | void;
};

const ContactFormView = ({ form, isSubmitting, onSubmit }: ContactFormViewProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col w-full bg-zinc-900/30 border border-zinc-800 rounded-lg py-6 px-6 md:p-8'
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

export default ContactFormView;
