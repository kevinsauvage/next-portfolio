'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';

import styles from './Hamburger.module.scss';

const Hamburger: React.FC = () => {
  const { openMenu, closeMenu, openOnMobile } = useGlobalContext();

  return (
    <button
      className={`${styles.Hamburger} ${openOnMobile ? styles.active : ''}`}
      onClick={() => (openOnMobile ? closeMenu() : openMenu())}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default Hamburger;
