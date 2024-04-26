'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input/Input';
import Label from '@/components/_scopes/form/Label/Label';
import TextArea from '@/components/_scopes/form/TextArea/TextArea';
import Button from '@/components/Button/Button';
import { useNotification } from '@/contexts/NotificationContext';

import styles from './ContactForm.module.scss';

import { LucideSend } from 'lucide-react';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={styles.button}
      svg={<LucideSend role="presentation" />}
      label="Send Message"
      type="submit"
      title="Click to send the Message"
      disabled={pending}
      loading={pending}
    />
  );
};

export type formDataType = {
  [key: string]: string;
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
      notification.error(errors.feedback as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <form ref={reference} className={styles.form} action={formAction} aria-label="Contact me">
      <div className={styles.row}>
        <Label>
          <span>
            Full name<span className={styles.required}>*</span>
          </span>
          <Input
            type="text"
            name="fullName"
            placeholder="Your Full name"
            aria-required="true"
            aria-label="Full name"
          />
          {errors?.fullName && <span className={styles.error}>{errors.fullName}</span>}
        </Label>
        <Label>
          <span>
            Email<span className={styles.required}>*</span>
          </span>
          <Input type="email" name="email" placeholder="Your email address" aria-required="true" />
          {errors?.email && <span className={styles.error}>{errors.email}</span>}
        </Label>
      </div>
      <div className={styles.row}>
        <Label>
          <span>Subject</span>
          <Input type="text" name="subject" placeholder="Subject" aria-required="false" />
          {errors?.subject && <span className={styles.error}>{errors.subject}</span>}
        </Label>
        <Label>
          <span>Phone</span>
          <Input type="phone" name="phone" placeholder="Your Phone Number" aria-required="false" />
          {errors?.phone && <span className={styles.error}>{errors.phone}</span>}
        </Label>
      </div>
      <Label>
        <span>
          Message<span className={styles.required}>*</span>
        </span>
        <TextArea name="message" placeholder="Write Your Message here" aria-required="true" />
        {errors?.message && <span className={styles.error}>{errors.message}</span>}
      </Label>
      <SubmitButton />
    </form>
  );
};

export default ContactForm;
