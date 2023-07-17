import React from 'react';
import Link from 'next/link';

import Animation from '@/components/Animation/Animation';
import IconEmailOutline from '@/svg/IconEmailOutline';
import IconGithub from '@/svg/IconGithub';
import IconLinkedinCircled from '@/svg/IconLinkedinCircled';
import IconUser from '@/svg/IconUser';

import styles from './ContactInfo.module.scss';

const socialButton = [
  {
    href: 'https://www.linkedin.com/in/kevin-sauvage/',
    icon: <IconLinkedinCircled />,
    text: 'Visit my Linkedin',
  },
  { href: 'https://github.com/kevinsauvage/', icon: <IconGithub />, text: 'Visit my Github' },
  { href: `/kevin-sauvage-cv.pdf`, icon: <IconUser />, text: 'Download my curriculum' },
  {
    href: 'mailto:kevinsauvage@outlook.com',
    icon: <IconEmailOutline />,
    text: 'Send me an e-mail',
  },
];

const ContactInfo = ({ replay }) => (
  <Animation
    replay={replay}
    duration={400}
    iterationCount="1"
    timingFunction="ease-in-out"
    fillMode="forwards"
    animationKeyframes={['fadeIn']}
    initialStyle={{ opacity: 0 }}
  >
    <div className={styles.info}>
      <ul className={`${styles.list}`}>
        {socialButton.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <a className={styles.icon} aria-label={item.text} target="_blank">
                {item.icon}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Animation>
);

export default ContactInfo;
