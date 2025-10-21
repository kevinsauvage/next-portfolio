'use client';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input';
import Label from '@/components/_scopes/form/Label';
import TextArea from '@/components/_scopes/form/TextArea';
import Button from '@/components/Button';
import { useNotification } from '@/contexts/NotificationContext';

import { LucideSend } from 'lucide-react';

const ErrorMessage = ({ error }: { error?: Array<string> }) => {
  return error?.length ? (
    <span className='block text-red-600 text-base'>{error[0]}</span>
  ) : undefined;
};

const LabelText = ({ children, required }: { children: React.ReactNode; required: boolean }) => (
  <span className='relative w-fit'>
    {children}
    {required && <span className='absolute -right-3 -top-1 text-red-600 text-2xl'>*</span>}
  </span>
);

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className='mt-4 w-full md:w-fit'
      svg={<LucideSend role='img' size={18} aria-label={text} />}
      label={text}
      type='submit'
      title={text}
      disabled={pending}
      loading={pending}
      variant='secondary'
      size='lg'
      data-umami-event='contact_form_submit'
    />
  );
};

const ContactForm = () => {
  const notification = useNotification();
  const reference = useRef<HTMLFormElement>(null);
  const [_isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function addRecaptcha(previousState: unknown, formData: FormData) {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const gRecaptchaToken = executeRecaptcha ? await executeRecaptcha('contactMessage') : '';
      formData.set('captcha', gRecaptchaToken);

      const result = await sendMail(previousState, formData);

      if (result?.error) {
        setSubmitStatus('error');
        return result;
      } else {
        setSubmitStatus('success');
        return result;
      }
    } catch {
      setSubmitStatus('error');
      return { error: true };
    } finally {
      setIsSubmitting(false);
    }
  }

  const [errors, formAction] = useActionState(addRecaptcha, {});

  useEffect(() => {
    if (submitStatus === 'success' && reference?.current) {
      reference.current.reset();
      notification.success('Your message has been sent successfully. I\'ll get back to you as soon as possible.');
      setSubmitStatus('idle');
    }

    if (submitStatus === 'error') {
      notification.error('An error occurred while sending your message. Please try again later.');
      setSubmitStatus('idle');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitStatus]);

  return (
    <form
      ref={reference}
      className='flex flex-col w-full'
      action={formAction}
      aria-label='Contact me'
    >
      <div className='space-y-7'>
        <Label>
          <LabelText required={true}>Full Name</LabelText>
          <Input
            type='text'
            name='fullName'
            placeholder='ex: John Doe'
            aria-required='true'
            aria-label='Full Name'
          />
          {errors?.fullName && <ErrorMessage error={errors.fullName} />}
        </Label>
        <Label>
          <LabelText required={true}>Email</LabelText>
          <Input
            type='text'
            name='email'
            placeholder='ex: johndoe@gmail.com'
            aria-required='true'
            aria-label='Email'
          />
          {errors?.email && <ErrorMessage error={errors.email} />}
        </Label>
        <Label>
          <LabelText required={true}>Message</LabelText>
          <TextArea
            name='message'
            placeholder='Share your thoughts or ask a question'
            aria-required='true'
            aria-label='Message'
          />
          {errors?.message && <ErrorMessage error={errors.message} />}
        </Label>
        <SubmitButton text="Send Message" />
      </div>
    </form>
  );
};

export default ContactForm;
