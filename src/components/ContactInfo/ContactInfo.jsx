'use client';

import { track } from '@vercel/analytics';
import Link from 'next/link';

import Animation from '@/components/Animation/Animation';
import socialButton from '@/config/socialButton';

import styles from './ContactInfo.module.scss';

const handleTrack = (link) => track('Click contactInfo', { link });

const ContactInfo = ({ className }) => (
  <Animation initial={{ opacity: 0 }} animate={{ opacity: 1 }} tag="div" className={className}>
    <ul className={styles.list}>
      {socialButton.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={styles.link}
            aria-label={item.text}
            target="_blank"
            prefetch={false}
            onClick={() => handleTrack(item.link)}
          >
            {item.icon}
          </Link>
        </li>
      ))}
    </ul>
  </Animation>
);

export default ContactInfo;
