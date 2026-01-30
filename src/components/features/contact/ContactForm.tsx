'use client';

import type { FormEvent } from 'react';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { type ContactFormState, sendMailAction } from '@/actions/send-mail';
import Button from '@/components/ui/Button/Button';
import { FormError, Input, Label, TextArea } from '@/components/ui/Form';

import { LucideSend } from 'lucide-react';
import { toast } from 'sonner';

export interface ContactFormValues {
  fullName: string;
  email: string;
  message: string;
}

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  fieldErrors: {},
};

const ContactForm = () => {
  const [formState, formAction, isPending] = useActionState<ContactFormState, FormData>(
    sendMailAction,
    initialContactFormState
  );
  const [isGettingCaptcha, setIsGettingCaptcha] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const isSubmitting = isPending || isGettingCaptcha;

  useEffect(() => {
    switch (formState.status) {
      case 'success': {
        formRef.current?.reset();
        if (formState.message) toast.success(formState.message);
        break;
      }
      case 'error': {
        if (formState.message) toast.error(formState.message);
        break;
      }
      default: {
        break;
      }
    }
    setIsGettingCaptcha(false);
  }, [formState]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGettingCaptcha(true);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    try {
      if (!executeRecaptcha) {
        toast.error('reCAPTCHA is not available. Please refresh the page and try again.');
        setIsGettingCaptcha(false);
        return;
      }

      const captchaToken = await executeRecaptcha('contactMessage');

      if (captchaToken) {
        formData.set('captcha', captchaToken);
      } else {
        toast.error('Failed to get reCAPTCHA token');
        setIsGettingCaptcha(false);
        return;
      }

      startTransition(() => {
        formAction(formData);
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        'An unexpected error occurred while sending your message. Please try again later.'
      );
      setIsGettingCaptcha(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
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
            placeholder='ex: John Doe'
            required
            minLength={2}
            aria-required='true'
            aria-invalid={!!formState.fieldErrors?.fullName}
            aria-describedby={formState.fieldErrors?.fullName ? 'fullName-error' : undefined}
            autoComplete='name'
          />
          {formState.fieldErrors?.fullName && (
            <FormError id='fullName-error' message={formState.fieldErrors?.fullName} />
          )}
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='email' required>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='ex: johndoe@gmail.com'
            required
            aria-required='true'
            aria-invalid={!!formState.fieldErrors?.email}
            aria-describedby={formState.fieldErrors?.email ? 'email-error' : undefined}
            autoComplete='email'
          />
          {formState.fieldErrors?.email && (
            <FormError id='email-error' message={formState.fieldErrors?.email} />
          )}
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='message' required>
            Message
          </Label>
          <TextArea
            id='message'
            name='message'
            placeholder='Share your thoughts or ask a question'
            required
            minLength={10}
            aria-required='true'
            aria-invalid={!!formState.fieldErrors?.message}
            aria-describedby={formState.fieldErrors?.message ? 'message-error' : undefined}
            autoComplete='off'
          />
          {formState.fieldErrors?.message && (
            <FormError id='message-error' message={formState.fieldErrors?.message} />
          )}
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

export default ContactForm;
