'use client';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input';
import Label from '@/components/_scopes/form/Label';
import TextArea from '@/components/_scopes/form/TextArea';
import Button from '@/components/Button';
import { useNotification } from '@/contexts/NotificationContext';

import { LucideSend } from 'lucide-react';

const ErrorMessage = ({ error }: { error?: Array<string> }) => {
  return error
    ? error.map((message) => (
        <span key={message} className="block text-red-600 text-base">
          {error}
        </span>
      ))
    : undefined;
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
      className="w-full justify-center items-center mt-4"
      svg={<LucideSend role="img" size={18} aria-label={text} />}
      label={text}
      type="submit"
      title={text}
      disabled={pending}
      loading={pending}
    />
  );
};

const ContactForm = ({
  translations,
}: {
  translations: {
    fullName: string;
    email: string;
    message: {
      placeholder: string;
      label: string;
    };
    submit: string;
  };
}) => {
  const notification = useNotification();
  const reference = useRef<HTMLFormElement>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function addRecaptcha(previousState: unknown, formData: FormData) {
    const gRecaptchaToken = executeRecaptcha ? await executeRecaptcha('contactMessage') : '';
    formData.set('captcha', gRecaptchaToken);

    return sendMail(previousState, formData);
  }

  const [errors, formAction] = useFormState(addRecaptcha, {});

  useEffect(() => {
    if (!errors && reference?.current) {
      reference.current.reset();
      notification.success('Message sent successfully');
    }

    if (errors?.feedback) {
      notification.error(errors.feedback[0]);
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
      <div className="rounded-lg space-y-7">
        <Label>
          <LabelText required={true}>{translations.fullName}</LabelText>
          <div>
            <Input
              type="text"
              name="fullName"
              placeholder="ex: John Doe"
              aria-required="true"
              aria-label={translations.fullName}
            />
            <ErrorMessage error={errors?.fullName} />
          </div>
        </Label>
        <Label>
          <LabelText required={true}>{translations.email}</LabelText>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="ex: johndoe@gmail.com"
              aria-required="true"
              aria-label={translations.email}
            />
            <ErrorMessage error={errors?.email} />
          </div>
        </Label>
        <Label>
          <LabelText required={true}>{translations.message.label}</LabelText>
          <div>
            <TextArea
              name="message"
              placeholder={translations.message.placeholder}
              aria-required="true"
              aria-label={translations.message.label}
            />
            <ErrorMessage error={errors?.message} />
          </div>
        </Label>

        <SubmitButton text={translations.submit} />
      </div>
    </form>
  );
};

export default ContactForm;
