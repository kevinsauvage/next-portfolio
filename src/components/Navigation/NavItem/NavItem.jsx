'use client';

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
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

  const { label, icon } = section || {};

  const handleTrack = () => track('Click navItem', { item: label });

  return (
    <li className={styles.item}>
      <a href={`/#${getSectionLabel(label)}`} onClick={handleTrack}>
        <div className={`${styles.button} ${hash === getSectionLabel(label) && styles.active}`}>
          <span className={styles.icon}>{icon}</span>
          <p className={styles.label}>{label}</p>
        </div>
      </a>
    </li>
  );
};

export default NavItem;
