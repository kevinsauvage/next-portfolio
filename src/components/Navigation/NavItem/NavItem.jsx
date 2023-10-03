'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { getSectionLabel } from '@/utils';

import styles from './NavItem.module.scss';

const NavItem = ({ section }) => {
  const [hash, setHash] = useState('');

  const pathname = usePathname();
  const searchParameters = useSearchParams();

  useEffect(() => {
    setHash(window.location.hash.replace('#', ''));
  }, [searchParameters, pathname]);

  return (
    <li className={styles.item}>
      <a href={`/#${getSectionLabel(section.label)}`}>
        <div
          className={`${styles.button} ${hash === getSectionLabel(section.label) && styles.active}`}
        >
          <span className={styles.icon}>{section.icon}</span>
          <p className={styles.label}>{section.label}</p>
        </div>
      </a>
    </li>
  );
};

export default NavItem;
