'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input';
import Label from '@/components/_scopes/form/Label';
import TextArea from '@/components/_scopes/form/TextArea';
import Button from '@/components/Button';
import { useNotification } from '@/contexts/NotificationContext';

import { LucideSend } from 'lucide-react';

const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:w-full">{children}</div>
);

const Error = ({ error }: { error?: Array<string> }) => {
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
    {required && <span className="absolute -right-3 -top-1 text-blue-400 text-2xl">*</span>}
  </span>
);

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-4"
      svg={<LucideSend role="presentation" />}
      label="Send Message"
      type="submit"
      title="Click to send the Message"
      disabled={pending}
      loading={pending}
    />
  );
};

const ContactForm = () => {
  const notification = useNotification();
  const reference = useRef<HTMLFormElement>(null);
  const [errors, formAction] = useFormState(sendMail, {});

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
      className="flex flex-col gap-4"
      action={formAction}
      aria-label="Contact me"
    >
      <FormRow>
        <Label>
          <LabelText required={true}>Full name</LabelText>
          <Input
            type="text"
            name="fullName"
            placeholder="Your Full name"
            aria-required="true"
            aria-label="Full name"
          />
          {<Error error={errors?.fullName} />}
        </Label>
        <Label>
          <LabelText required={true}>Email</LabelText>
          <Input type="email" name="email" placeholder="Your email address" aria-required="true" />
          <Error error={errors?.email} />
        </Label>
      </FormRow>
      <FormRow>
        <Label>
          <LabelText required={false}>Subject</LabelText>
          <Input type="text" name="subject" placeholder="The Subject" aria-required="false" />
          <Error error={errors?.subject} />
        </Label>
        <Label>
          <LabelText required={false}>Phone</LabelText>
          <Input type="phone" name="phone" placeholder="Your Phone Number" aria-required="false" />
          <Error error={errors?.phone} />
        </Label>
      </FormRow>
      <Label>
        <LabelText required={true}>Message</LabelText>
        <TextArea name="message" placeholder="Your Message" aria-required="true" />
        <Error error={errors?.message} />
      </Label>
      <SubmitButton />
    </form>
  );
};

export default ContactForm;
