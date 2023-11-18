'use client';

import { useState } from 'react';
import { RiMailSendFill } from 'react-icons/ri';

import Input from '@/components/_scopes/form/Input/Input';
import Label from '@/components/_scopes/form/Label/Label';
import TextArea from '@/components/_scopes/form/TextArea/TextArea';
import Button from '@/components/Button/Button';
import { useNotification } from '@/contexts/NotificationContext';
import useForm from '@/hooks/useForm';
import sendMail from '@/utils/sendMail';

import styles from './ContactForm.module.scss';

export type formDataType = {
  [key: string]: string;
};

export type clearInputsType = () => void;

const ContactForm = () => {
  const notification = useNotification();
  const [missing, setMissing] = useState<Array<string>>([]);

  const handleSubmitCallback = async (formData: formDataType, clearInputs: clearInputsType) => {
    const { email, fullName, subject, message, phone } = formData;
    const errors = [];

    const requiredFields: Array<keyof typeof formData> = [
      'email',
      'fullName',
      'message',
      'subject',
    ];

    const missingValues = requiredFields.filter((field) => !formData[field]);

    setMissing(missingValues.map((value) => value.toString()));

    if (missingValues.length > 0) {
      const missingFieldMessage =
        missingValues.length === 1
          ? `Oops! It looks like you forgot to fill in the <strong>"${missingValues[0]}"</strong> field. Could you please provide the necessary information?`
          : `Oops! It looks like you missed filling out some important fields:  <strong>${missingValues.join(
              ', ',
            )}</strong>. Could you please complete them?`;

      errors.push(missingFieldMessage);
    }

    if (subject?.length > 0 && subject?.length < 3) {
      errors.push(
        `Hold on! Your subject deserves a bit more attention. It should be at least 3 characters long.`,
      );
    }

    if (message?.length > 0 && message.length < 100) {
      errors.push(
        `Almost there! Your message could use a little more detail. We suggest a minimum of 100 characters. Currently, your message contains ${message.length} characters.`,
      );
    }

    if (errors.length > 0) {
      return errors.forEach((error) => notification.error(error));
    }

    const response = await sendMail({ email, fullName, message, phone, subject });

    if (response?.ok) {
      notification.success('Mail correctly sent');
      clearInputs?.();
    } else {
      notification.error('Something went wrong, please try again.');
    }
  };

  const {
    formData: { email, fullName, phone, subject, message },
    handleInputChange,
    handleSubmit,
    loading,
  } = useForm({
    initialValues: {
      email: '',
      fullName: '',
      message: '',
      phone: '',
      subject: '',
    },
    onSubmit: handleSubmitCallback,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} onChange={() => setMissing([])}>
      <div className={styles.row}>
        <Label missing={missing.includes('fullName')}>
          <span>
            Full name<span className={styles.required}>*</span>
          </span>
          <Input
            onChange={handleInputChange}
            type="text"
            name="fullName"
            placeholder="Your Full name"
            value={fullName}
          />
        </Label>
        <Label missing={missing.includes('email')}>
          <span>
            Email<span className={styles.required}>*</span>
          </span>
          <Input
            onChange={handleInputChange}
            type="email"
            name="email"
            placeholder="Your email address"
            value={email}
          />
        </Label>
      </div>
      <div className={styles.row}>
        <Label missing={missing.includes('subject')}>
          <span>
            Subject<span className={styles.required}>*</span>
          </span>
          <Input
            onChange={handleInputChange}
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
          />
        </Label>
        <Label>
          <span>Phone</span>
          <Input
            onChange={handleInputChange}
            type="phone"
            name="phone"
            placeholder="Your Phone Number"
            value={phone}
          />
        </Label>
      </div>
      <Label missing={missing.includes('message')}>
        <span>
          Message<span className={styles.required}>*</span>
        </span>
        <TextArea
          name="message"
          value={message}
          onChange={handleInputChange}
          placeholder="Write Your Message here"
        />
      </Label>

      <Button
        loading={loading}
        className={styles.button}
        svg={<RiMailSendFill />}
        label="Send Message"
        type="submit"
        title="Send Message"
      />
    </form>
  );
};

export default ContactForm;
