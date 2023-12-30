import Link from 'next/link';

import socialButton from '@/config/socialButton';

import styles from './ContactInfo.module.scss';

const ContactInfo = () => (
  <ul className={styles.list}>
    {socialButton.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          className={styles.link}
          aria-label={item.text}
          target="_blank"
          prefetch={false}
          rel="noopener noreferrer"
          title={`${item.text} profile`}
        >
          {item.icon}
        </Link>
      </li>
    ))}
  </ul>
);

export default ContactInfo;
