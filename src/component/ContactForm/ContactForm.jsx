import React from 'react';

import Button from '../Button/Button';

import ContactFunction from './ContactFunction';

import styles from './ContactForm.module.scss';

const ContactForm = () => {
  const { handleChange, handleSubmit, userFeedback, isLoading, formData } = ContactFunction();

  return (
    <>
      <p className={styles.subtitle}>
        Whether you have a project in mind or just want to chat, I’m all ears. Send me a message!
      </p>
      <form className={styles.form} action="submit" onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.row}>
          <label>
            Name:
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              placeholder="John Smith"
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email@gmail.com"
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          Subject:
          <input
            className={styles.input}
            type="text"
            name="subject"
            value={formData.subject}
            placeholder="Job offer"
            onChange={handleChange}
          />
        </label>
        <label>
          Message:
          <textarea
            className={styles['text-area']}
            name="message"
            cols="30"
            rows="10"
            value={formData.message}
            placeholder="Hello, I'm reaching out ..."
            onChange={handleChange}
          />
        </label>
        {userFeedback && (
          <div className={styles.feedback}>
            <p>{userFeedback}</p>
          </div>
        )}

        <Button
          className={styles.button}
          type="submit"
          loading={isLoading}
          label="Send message"
          variant="outlined"
        />
      </form>
    </>
  );
};

export default ContactForm;
