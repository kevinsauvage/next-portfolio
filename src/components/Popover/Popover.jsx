import { useState } from 'react';

import styles from './Popover.module.scss';

const Popover = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${styles.popover} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.arrow} />

      {isHovered && <div className={styles.tooltip}>{text}</div>}
      {children}
    </div>
  );
};

export default Popover;
