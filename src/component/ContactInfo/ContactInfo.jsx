import React from 'react';
import Link from 'next/link';

import { github, linkedin, mail } from '../../data/svg';

import styles from './ContactInfo.module.scss';

const socialButton = [
  { href: 'https://www.linkedin.com/in/kevin-sauvage/', icon: linkedin, text: 'Linkedin' },
  { href: 'https://github.com/kevinsauvage/', icon: github, text: 'Github' },
  { href: 'mailto:kevinsauvage@outlook.com', icon: mail, text: 'E-mail' },
];

const ContactInfo = () => (
  <div className={styles.info}>
    {socialButton.map((item) => (
      <Link href={item.href} key={item.href}>
        <a className={styles.icon} target="_blank">
          {item.icon}
          <span>{item.text}</span>
        </a>
      </Link>
    ))}
  </div>
);

export default ContactInfo;
