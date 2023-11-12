'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { getSectionLabel } from '@/utils';

import styles from './NavItem.module.scss';

const NavItem = ({ section }) => {
  const [hash, setHash] = useState('Introduction');

  const pathname = usePathname();
  const searchParameters = useSearchParams();

  useEffect(() => {
    setHash(window.location.hash.replace('#', ''));
  }, [searchParameters, pathname]);

  const { label, icon } = section || {};

  const handleClick = () => {
    document.querySelector(`#${getSectionLabel(label)}`).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <li className={styles.item}>
      <button
        type="button"
        onClick={handleClick}
        className={`${styles.button} ${hash === getSectionLabel(label) && styles.active}`}
      >
        <span className={styles.icon}>{icon}</span>
        <p className={styles.label}>{label}</p>
      </button>
    </li>
  );
};

export default NavItem;
