'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';

import styles from './Hamburger.module.scss';

const Hamburger: React.FC = () => {
  const { openOnMobile, toggleOpenOnMobile } = useGlobalContext();

  return (
    <button
      className={`${styles.Hamburger} ${openOnMobile ? styles.active : ''}`}
      onClick={() => toggleOpenOnMobile()}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default Hamburger;
