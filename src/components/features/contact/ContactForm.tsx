'use client';

import type { FocusEvent, FormEvent } from 'react';
import { startTransition, useActionState, useCallback, useEffect, useRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { type ContactFormState, sendMailAction } from '@/actions/send-mail';
import Button from '@/components/ui/Button/Button';
import { FormError, Input, Label, TextArea } from '@/components/ui/Form';
import { BodySmall, H3 } from '@/components/ui/Typography';
import { sections } from '@/config/content/sections';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';
import {
  collectFieldErrors,
  CONTACT_CAPTCHA_ACTION,
  CONTACT_FIELD_LIMITS,
  CONTACT_FIELDS,
  type ContactFieldErrors,
  contactFieldsSchema,
  isContactField,
  readContactFields,
} from '@/schemas/contact-fields.schema';

import { CheckCircle2, LucideSend, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const copy = sections.contact.form;

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
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const prevStateRef = useRef<ContactFormState>(initialContactFormState);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const isSubmitting = isPending || isGettingCaptcha;
  const hasClientErrors = Object.keys(clientErrors).length > 0;
  const fieldErrors = hasClientErrors ? clientErrors : formState.fieldErrors;
  // Captcha failures have no input to attach to, so surface them form-level.
  const captchaError = hasClientErrors ? undefined : formState.fieldErrors.captcha;
  const firstErrorMessage = Object.values(fieldErrors).find(
    (message): message is string => typeof message === 'string' && message.length > 0
  );
  const fieldErrorAnnouncement = firstErrorMessage ? `Validation error: ${firstErrorMessage}` : '';

  const focusFirstInvalidField = useCallback((errors: ContactFieldErrors) => {
    // eslint-disable-next-line security/detect-object-injection -- key narrowed to ContactFieldName
    const firstInvalidField = CONTACT_FIELDS.find(field => errors[field]);
    if (!firstInvalidField) return;
    const element = formRef.current?.elements.namedItem(firstInvalidField);
    if (element instanceof HTMLElement) element.focus();
  }, []);

  useEffect(() => {
    const isNewResult = prevStateRef.current !== formState;
    prevStateRef.current = formState;
    if (isNewResult && formState.status === 'success') {
      trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_SUCCESS);
    }
    if (isNewResult && formState.status === 'error') {
      trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_ERROR, {
        message: formState.message ?? 'unknown',
      });
    }

    switch (formState.status) {
      case 'success': {
        formRef.current?.reset();
        setClientErrors({});
        setHasSubmitted(false);
        setIsSent(true);
        if (formState.message) toast.success(formState.message);
        break;
      }
      case 'error': {
        if (formState.message) toast.error(formState.message);
        if (Object.keys(formState.fieldErrors ?? {}).length > 0) {
          focusFirstInvalidField(formState.fieldErrors);
        }
        break;
      }
      default: {
        break;
      }
    }
    setIsGettingCaptcha(false);
  }, [formState, focusFirstInvalidField]);

  useEffect(() => {
    if (isSent) successRef.current?.focus();
  }, [isSent]);

  const handleSendAnother = () => {
    setIsSent(false);
    setClientErrors({});
    setHasSubmitted(false);
    formRef.current?.reset();
  };

  const handleFieldBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (!isContactField(name)) return;
    // Avoid shouting "required" before the user has attempted to submit.
    if (!hasSubmitted && value.trim() === '') return;

    // eslint-disable-next-line security/detect-object-injection -- key narrowed to ContactFieldName
    const result = contactFieldsSchema.shape[name].safeParse(value);
    setClientErrors(previous => {
      const { [name]: _removed, ...rest } = previous;
      return result.success
        ? rest
        : { ...rest, [name]: result.error.issues[0]?.message ?? copy.errors.invalidValue };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Fires only on a real submit attempt (with captcha flow), unlike a
    // button click handler which also fires when reCAPTCHA is unavailable.
    trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_ATTEMPT);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const parsed = contactFieldsSchema.safeParse(readContactFields(formData));
    if (!parsed.success) {
      const errors = collectFieldErrors(parsed.error.issues);
      setClientErrors(errors);
      setHasSubmitted(true);
      focusFirstInvalidField(errors);
      return;
    }

    setClientErrors({});
    setHasSubmitted(true);
    setIsGettingCaptcha(true);

    try {
      if (!executeRecaptcha) {
        toast.error(copy.errors.recaptchaUnavailable);
        setIsGettingCaptcha(false);
        return;
      }

      const captchaToken = await executeRecaptcha(CONTACT_CAPTCHA_ACTION);

      if (captchaToken) {
        formData.set('captcha', captchaToken);
      } else {
        toast.error(copy.errors.recaptchaToken);
        setIsGettingCaptcha(false);
        return;
      }

      startTransition(() => {
        formAction(formData);
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(copy.errors.unexpected);
      setIsGettingCaptcha(false);
    }
  };

  if (isSent) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-lg border border-primary-800/50 bg-primary-950/20 px-6 py-12 text-center outline-none'
      >
        <span
          className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/15 text-primary-300'
          aria-hidden='true'
        >
          <CheckCircle2 size={28} />
        </span>
        <div className='space-y-2'>
          <H3 size='sm'>{copy.sentTitle}</H3>
          <BodySmall className='text-zinc-300'>{formState.message ?? copy.sentFallback}</BodySmall>
        </div>
        <Button
          label={copy.sendAnother}
          onClick={handleSendAnother}
          svg={<RotateCcw size={16} aria-hidden='true' />}
          variant='secondary'
          size='md'
        />
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className='flex flex-col w-full bg-black/25 backdrop-blur-md border border-zinc-800 rounded-lg py-6 px-6 md:p-8 max-w-3xl mx-auto'
      aria-label={copy.ariaLabel}
      noValidate
    >
      <output className='sr-only' aria-live='polite' aria-atomic='true'>
        {isSubmitting ? copy.announceSubmitting : fieldErrorAnnouncement}
      </output>
      <div className='space-y-6'>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='fullName' required>
            {copy.labels.fullName}
          </Label>
          <Input
            id='fullName'
            name='fullName'
            type='text'
            placeholder={copy.placeholders.fullName}
            required
            minLength={2}
            maxLength={CONTACT_FIELD_LIMITS.fullName}
            aria-required='true'
            aria-invalid={!!fieldErrors.fullName}
            aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
            autoComplete='name'
            onBlur={handleFieldBlur}
          />
          {fieldErrors.fullName && <FormError id='fullName-error' message={fieldErrors.fullName} />}
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='email' required>
            {copy.labels.email}
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder={copy.placeholders.email}
            required
            maxLength={CONTACT_FIELD_LIMITS.email}
            aria-required='true'
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            autoComplete='email'
            onBlur={handleFieldBlur}
          />
          {fieldErrors.email && <FormError id='email-error' message={fieldErrors.email} />}
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='message' required>
            {copy.labels.message}
          </Label>
          <TextArea
            id='message'
            name='message'
            placeholder={copy.placeholders.message}
            required
            maxLength={CONTACT_FIELD_LIMITS.message}
            aria-required='true'
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            autoComplete='off'
            onBlur={handleFieldBlur}
          />
          {fieldErrors.message && <FormError id='message-error' message={fieldErrors.message} />}
        </div>

        {captchaError && (
          <FormError id='captcha-error' message={captchaError} className='justify-center' />
        )}

        <Button
          className='mt-2 w-full sm:w-auto'
          svg={<LucideSend size={18} aria-hidden='true' />}
          label={isSubmitting ? copy.submitting : copy.submit}
          type='submit'
          title={copy.submit}
          disabled={isSubmitting}
          variant='primary'
          size='md'
        />

        <p className='text-xs leading-relaxed text-zinc-500'>
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href='https://policies.google.com/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-200'
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href='https://policies.google.com/terms'
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-200'
          >
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
