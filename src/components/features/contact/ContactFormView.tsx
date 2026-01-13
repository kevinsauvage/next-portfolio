'use client';

import type { UseFormReturn } from 'react-hook-form';

import Button from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { colors } from '@/design-system/tokens';

import type { ContactFormValues } from './ContactForm';

import clsx from 'clsx';
import { AlertCircle, LucideSend } from 'lucide-react';

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
        className='flex flex-col w-full bg-black/25 backdrop-blur-md border border-zinc-800 rounded-lg py-6 px-6 md:p-8 max-w-3xl mx-auto'
        aria-label='Contact form'
        noValidate
      >
        <output className='sr-only' aria-live='polite' aria-atomic='true'>
          {isSubmitting ? 'Sending message...' : ''}
        </output>
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
                    autoComplete='name'
                  />
                </FormControl>
                {fieldState.error && (
                  <div
                    id='fullName-error'
                    role='alert'
                    className={clsx('flex items-center gap-1.5 mt-1 text-sm', colors.status.error)}
                  >
                    <AlertCircle size={14} aria-hidden='true' className='flex-shrink-0' />
                    <span>{fieldState.error.message}</span>
                  </div>
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
                    autoComplete='email'
                  />
                </FormControl>
                {fieldState.error && (
                  <div
                    id='email-error'
                    role='alert'
                    className={clsx('flex items-center gap-1.5 mt-1 text-sm', colors.status.error)}
                  >
                    <AlertCircle size={14} aria-hidden='true' className='flex-shrink-0' />
                    <span>{fieldState.error.message}</span>
                  </div>
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
                    autoComplete='off'
                  />
                </FormControl>
                {fieldState.error && (
                  <div
                    id='message-error'
                    role='alert'
                    className={clsx('flex items-center gap-1.5 mt-1 text-sm', colors.status.error)}
                  >
                    <AlertCircle size={14} aria-hidden='true' className='flex-shrink-0' />
                    <span>{fieldState.error.message}</span>
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button
            className='mt-2 w-full sm:w-auto'
            svg={<LucideSend role='img' size={18} aria-hidden='true' />}
            label={isSubmitting ? 'Sending...' : 'Send Message'}
            type='submit'
            title='Send Message'
            disabled={isSubmitting}
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
