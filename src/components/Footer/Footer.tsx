import Link from 'next/link';

import socialButton from '@/config/socialButton';

import styles from './Footer.module.scss';

const linkedinLink = socialButton.find((button) => button.id === 'linkedin')?.href;

const Footer = () => (
  <footer className={styles.Footer}>
    {linkedinLink && (
      <Link
        className={styles.link}
        href={linkedinLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Kévin Sauvage linkedin profile in a new tab"
      >
        Designed & Built by Kévin Sauvage
      </Link>
    )}

    <p className={styles.copyright}>© {new Date().getFullYear()}. All rights reserved.</p>
  </footer>
);

export default Footer;
