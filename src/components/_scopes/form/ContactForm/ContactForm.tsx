'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { sendMail } from '@/actions/send-mail';
import Input from '@/components/_scopes/form/Input/Input';
import Label from '@/components/_scopes/form/Label/Label';
import TextArea from '@/components/_scopes/form/TextArea/TextArea';
import { useNotification } from '@/contexts/NotificationContext';

import SubmitButton from './SubmitButton';

import styles from './ContactForm.module.scss';

export type formDataType = {
  [key: string]: string;
};

export type clearInputsType = () => void;

const clearInputs: clearInputsType = () => {
  const inputs = document.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement>;
  inputs.forEach((input) => (input.value = ''));
};

const ContactForm = () => {
  const notification = useNotification();
  //@ts-expect-error https://github.com/vercel/next.js/issues/56041
  const [state, formAction] = useFormState(sendMail, {});

  useEffect(() => {
    if (state?.success) {
      clearInputs();
      notification.success(state.message);
    }
    if (state?.error) {
      notification.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form className={styles.form} action={formAction}>
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
        </Label>
        <Label>
          <span>
            Email<span className={styles.required}>*</span>
          </span>
          <Input type="email" name="email" placeholder="Your email address" aria-required="true" />
        </Label>
      </div>
      <div className={styles.row}>
        <Label>
          <span>Subject</span>
          <Input type="text" name="subject" placeholder="Subject" aria-required="false" />
        </Label>
        <Label>
          <span>Phone</span>
          <Input type="phone" name="phone" placeholder="Your Phone Number" aria-required="false" />
        </Label>
      </div>
      <Label>
        <span>
          Message<span className={styles.required}>*</span>
        </span>
        <TextArea name="message" placeholder="Write Your Message here" aria-required="true" />
      </Label>
      <SubmitButton style={styles.button} />
    </form>
  );
};

export default ContactForm;
