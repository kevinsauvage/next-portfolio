import Link from 'next/link';

import Animation from '@/components/Animation/Animation';
import socialButton from '@/config/socialButton';

import styles from './ContactInfo.module.scss';

const ContactInfo = ({ replay, className }) => (
  <Animation
    replay={replay}
    duration={400}
    iterationCount="1"
    timingFunction="ease-in-out"
    fillMode="forwards"
    animationKeyframes={['fadeIn']}
    initialStyle={{ opacity: 0 }}
  >
    <div className={`${styles.info} ${className}`}>
      <ul className={styles.list}>
        {socialButton.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <a className={styles.link} aria-label={item.text} target="_blank">
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
