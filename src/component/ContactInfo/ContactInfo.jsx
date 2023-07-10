import React from 'react';
import Link from 'next/link';

import IconGithub from '../../svg/IconGithub';
import IconLinkedinCircled from '../../svg/IconLinkedinCircled';
import IconMail from '../../svg/IconMail';
import IconProfile from '../../svg/IconProfile';

import styles from './ContactInfo.module.scss';

const socialButtonRight = [
  {
    href: 'https://www.linkedin.com/in/kevin-sauvage/',
    icon: <IconLinkedinCircled />,
    text: 'Visit my Linkedin',
  },
  { href: 'https://github.com/kevinsauvage/', icon: <IconGithub />, text: 'Visit my Github' },
];

const socialButtonLeft = [
  { href: `/kevin-sauvage-cv.pdf`, icon: <IconProfile />, text: 'Download my curriculum' },
  {
    href: 'mailto:kevinsauvage@outlook.com',
    icon: <IconMail />,
    text: 'Send me an e-mail',
  },
];

const ContactInfo = () => (
  <div className={styles.info}>
    <ul className={`${styles.left} fade-in--active`}>
      {socialButtonLeft.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>
            <a className={styles.icon} target="_blank">
              {item.icon}
              <span className={styles.popover}>{item.text}</span>
            </a>
          </Link>
        </li>
      ))}

      <span className={styles.line} />
    </ul>
    <ul className={`${styles.right} fade-in--active`}>
      {socialButtonRight.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>
            <a className={styles.icon} target="_blank">
              {item.icon}
              <span className={styles.popover}>{item.text}</span>
            </a>
          </Link>
        </li>
      ))}
      <span className={styles.line} />
    </ul>
  </div>
);

export default ContactInfo;
