import { MdLocationOn, MdMail } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

import { github, linkedin, mail } from '../../data/svg';
import Button from '../Button/Button';
import GradientBorder from '../GradientBorder/GradientBorder';
import Section from '../Section/Section';
import SlideUpAndFadeIn from '../SlideUpAndFadeIn/SlideUpAndFadeIn';
import Title from '../Title/Title';

import ContactFunction from './ContactFunction';

import styles from './Contact.module.scss';

const Contact = () => {
  const { handleChange, handleSubmit, userFeedback, isLoading, formData } = ContactFunction();

  const socialButton = [
    { href: 'https://www.linkedin.com/in/kevin-sauvage/', icon: linkedin, text: 'Linkedin' },
    { href: 'https://github.com/kevinsauvage/', icon: github, text: 'Github' },
    { href: 'mailto:kevinsauvage@outlook.com', icon: mail, text: 'E-mail' },
  ];

  return (
    <Section id="contact" className={styles.Contact}>
      <Title>Get in touch</Title>
      <div className={styles.container}>
        <SlideUpAndFadeIn className={styles.info}>
          <div>
            <p className={styles.name}>Kévin Sauvage</p>
            <p className={styles.job}>- Developer -</p>
          </div>
          <div className={styles.middle}>
            <div className={styles.row}>
              <MdMail />
              <p>kevinsauvage@outlook.com</p>
            </div>
            <div className={styles.row}>
              <MdLocationOn />
              <p>Barcelona, SPAIN</p>
            </div>
          </div>
          <div className={styles.social}>
            {socialButton.map((item) => (
              <Link href={item.href} key={item.href}>
                <a className={styles.icon} target="_blank">
                  {item.icon}
                  <span>{item.text}</span>
                </a>
              </Link>
            ))}
          </div>
        </SlideUpAndFadeIn>
        <SlideUpAndFadeIn className={styles.form}>
          <form action="submit" onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.row}>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <input
              className={styles.input}
              type="text"
              name="subject"
              value={formData.subject}
              placeholder="Subject"
              onChange={handleChange}
            />
            <textarea
              className={styles['text-area']}
              name="message"
              cols="30"
              rows="10"
              value={formData.message}
              placeholder="Message"
              onChange={handleChange}
            />
            {userFeedback && (
              <div className={styles.feedback}>
                <p>{userFeedback}</p>
              </div>
            )}

            <GradientBorder radius="8px">
              <Button type="submit" loading={isLoading} label="Send" variant="outlined" />
            </GradientBorder>
          </form>
        </SlideUpAndFadeIn>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Section>
  );
};

export default Contact;
