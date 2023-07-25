import { useNotification } from '@/contexts/NotificationContext';
import useForm from '@/hooks/useForm';

import Input from '../_scopes/form/Input/Input';
import Label from '../_scopes/form/Label/Label';
import TextArea from '../_scopes/form/TextArea/TextArea';
import Button from '../Button/Button';

import styles from './ContactForm.module.scss';

const sendMail = async (body) => {
  try {
    const response = await fetch(`/api/send-mail`, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (response) return response.json();
  } catch (error) {
    console.error(error);
  }
};

const ContactForm = () => {
  const { enqueueNotification } = useNotification();

  const handleSubmitCallback = async (formData, clearInputs) => {
    const { email, fullName, subject, message, phone } = formData;

    if (!(email && fullName && subject && message)) {
      enqueueNotification('Please fill in all the fields', 'warn');
      return false;
    }

    const response = await sendMail({ email, fullName, message, phone, subject });

    if (response?.ok) {
      enqueueNotification('Mail correctly sent', 'success');
      clearInputs?.();
    } else {
      enqueueNotification('Something went wrong, please try again.', 'error');
    }
  };

  const {
    formData: { email, fullName, phone, subject, message },
    handleInputChange,
    handleSubmit,
    loading,
  } = useForm(handleSubmitCallback, {
    email: '',
    fullName: '',
    message: '',
    phone: '',
    subject: '',
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <Label>
          Full name*
          <Input
            onChange={handleInputChange}
            type="text"
            name="fullName"
            placeholder="Your Full name"
            value={fullName}
          />
        </Label>
        <Label>
          Email*
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
        <Label>
          Phone (optional)
          <Input
            onChange={handleInputChange}
            type="phone"
            name="phone"
            placeholder="Your Phone Number"
            value={phone}
          />
        </Label>
        <Label>
          Subject*
          <Input
            onChange={handleInputChange}
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
          />
        </Label>
      </div>
      <Label>
        Message*
        <TextArea
          name="message"
          value={message}
          onChange={handleInputChange}
          placeholder="Write Your Message here"
        />
      </Label>
      <Button loading={loading} className={styles.button} label="Send Message" type="submit" />
    </form>
  );
};

export default ContactForm;
