import React from 'react';
import Link from 'next/link';

import { arrowbase2, github, linkedin } from '../../data/svg';

import styles from './ContactInfo.module.scss';

const ContactInfo = () => {
  const socialButtonRight = [
    { href: 'https://www.linkedin.com/in/kevin-sauvage/', icon: linkedin, text: 'Linkedin' },
    { href: 'https://github.com/kevinsauvage/', icon: github, text: 'Github' },
  ];

  const socialButtonLeft = [
    { href: `/kevin-sauvage-cv.pdf`, icon: <>CV</>, text: 'Curriculum' },
    { href: 'mailto:kevinsauvage@outlook.com', icon: arrowbase2, text: 'E-mail' },
  ];

  return (
    <div className={styles.info}>
      <ul className={styles.left}>
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
      </ul>
      <ul className={styles.right}>
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
      </ul>
    </div>
  );
};

export default ContactInfo;
