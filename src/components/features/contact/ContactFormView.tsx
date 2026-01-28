'use client';

import Button from '@/components/ui/Button';
import { FormError } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';

import type { ContactFormValues } from './ContactForm';

import { LucideSend } from 'lucide-react';

type ContactFormViewProps = {
  formValues: ContactFormValues;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const ContactFormView = ({
  formValues,
  errors,
  isSubmitting,
  onSubmit,
  onChange,
}: ContactFormViewProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col w-full bg-black/25 backdrop-blur-md border border-zinc-800 rounded-lg py-6 px-6 md:p-8 max-w-3xl mx-auto'
      aria-label='Contact form'
      noValidate
    >
      <output className='sr-only' aria-live='polite' aria-atomic='true'>
        {isSubmitting ? 'Sending message...' : ''}
      </output>
      <div className='space-y-6'>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='fullName' required>
            Full Name
          </Label>
          <Input
            id='fullName'
            name='fullName'
            type='text'
            value={formValues.fullName}
            onChange={onChange}
            placeholder='ex: John Doe'
            required
            minLength={2}
            aria-required='true'
            aria-invalid={!!errors['fullName']}
            aria-describedby={errors['fullName'] ? 'fullName-error' : undefined}
            autoComplete='name'
          />
          {errors['fullName'] && <FormError id='fullName-error' message={errors['fullName']} />}
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='email' required>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            value={formValues.email}
            onChange={onChange}
            placeholder='ex: johndoe@gmail.com'
            required
            aria-required='true'
            aria-invalid={!!errors['email']}
            aria-describedby={errors['email'] ? 'email-error' : undefined}
            autoComplete='email'
          />
          {errors['email'] && <FormError id='email-error' message={errors['email']} />}
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='message' required>
            Message
          </Label>
          <TextArea
            id='message'
            name='message'
            value={formValues.message}
            onChange={onChange}
            placeholder='Share your thoughts or ask a question'
            required
            minLength={10}
            aria-required='true'
            aria-invalid={!!errors['message']}
            aria-describedby={errors['message'] ? 'message-error' : undefined}
            autoComplete='off'
          />
          {errors['message'] && <FormError id='message-error' message={errors['message']} />}
        </div>

        <Button
          className='mt-2 w-full sm:w-auto'
          svg={<LucideSend role='img' size={18} aria-hidden='true' />}
          label={isSubmitting ? 'Sending...' : 'Send Message'}
          type='submit'
          title='Send Message'
          disabled={isSubmitting}
          variant='primary'
          size='md'
          eventName='contact_form_submit'
          aria-live='polite'
        />
      </div>
    </form>
  );
};

export default ContactFormView;
