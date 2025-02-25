'use client';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { useTranslations } from 'next-intl';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input';
import Label from '@/components/_scopes/form/Label';
import TextArea from '@/components/_scopes/form/TextArea';
import Button from '@/components/Button';
import { useNotification } from '@/contexts/NotificationContext';

import { LucideSend } from 'lucide-react';

const ErrorMessage = ({ error }: { error?: Array<string> }) => {
  return error?.length ? (
    <span className="block text-red-600 text-base">{error[0]}</span>
  ) : undefined;
};

const LabelText = ({ children, required }: { children: React.ReactNode; required: boolean }) => (
  <span className="relative w-fit">
    {children}
    {required && <span className="absolute -right-3 -top-1 text-red-600 text-2xl">*</span>}
  </span>
);

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-4 w-full md:w-fit"
      svg={<LucideSend role="img" size={18} aria-label={text} />}
      label={text}
      type="submit"
      title={text}
      disabled={pending}
      loading={pending}
      variant="secondary"
      size="lg"
      data-umami-event="contact_form_submit"
    />
  );
};

const ContactForm = () => {
  const notification = useNotification();
  const reference = useRef<HTMLFormElement>(null);
  const t = useTranslations('home.contact.form');

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function addRecaptcha(previousState: unknown, formData: FormData) {
    const gRecaptchaToken = executeRecaptcha ? await executeRecaptcha('contactMessage') : '';
    formData.set('captcha', gRecaptchaToken);

    return sendMail(previousState, formData);
  }

  const [errors, formAction] = useActionState(addRecaptcha, {});

  useEffect(() => {
    if (!errors && reference?.current) {
      reference.current.reset();
      notification.success(t('success'));
    }

    if (errors?.error) {
      notification.error(t('error'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <form
      ref={reference}
      className="flex flex-col w-full"
      action={formAction}
      aria-label="Contact me"
    >
      <div className="space-y-7">
        <Label>
          <LabelText required={true}>{t('fullName')}</LabelText>
          <Input
            type="text"
            name="fullName"
            placeholder="ex: John Doe"
            aria-required="true"
            aria-label={t('fullName')}
          />
          <ErrorMessage error={errors?.fullName} />
        </Label>
        <Label>
          <LabelText required={true}>{t('email')}</LabelText>
          <Input
            type="text"
            name="email"
            placeholder="ex: johndoe@gmail.com"
            aria-required="true"
            aria-label={t('email')}
          />
          <ErrorMessage error={errors?.email} />
        </Label>
        <Label>
          <LabelText required={true}>{t('message.label')}</LabelText>
          <TextArea
            name="message"
            placeholder={t('message.placeholder')}
            aria-required="true"
            aria-label={t('message.label')}
          />
          <ErrorMessage error={errors?.message} />
        </Label>
        <SubmitButton text={t('submit')} />
      </div>
    </form>
  );
};

export default ContactForm;
