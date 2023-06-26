import React from 'react';
import Link from 'next/link';

import IconGithub from '../../svg/IconGithub';
import IconLinkedinCircled from '../../svg/IconLinkedinCircled';
import IconMail from '../../svg/IconMail';
import IconProfile from '../../svg/IconProfile';
import FadeIn from '../FadeIn/FadeIn';

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
    <ul className={styles.left}>
      {socialButtonLeft.map((item, index) => (
        <li key={item.href}>
          <FadeIn delay={`${0.5 * index + 0.5}s`}>
            <Link href={item.href}>
              <a className={styles.icon} target="_blank">
                {item.icon}
                <span className={styles.popover}>{item.text}</span>
              </a>
            </Link>
          </FadeIn>
        </li>
      ))}
    </ul>
    <ul className={styles.right}>
      {socialButtonRight.map((item, index) => (
        <li key={item.href}>
          <FadeIn delay={`${0.5 * index + 0.5}s`}>
            <Link href={item.href}>
              <a className={styles.icon} target="_blank">
                {item.icon}
                <span className={styles.popover}>{item.text}</span>
              </a>
            </Link>
          </FadeIn>
        </li>
      ))}
    </ul>
  </div>
);

export default ContactInfo;
