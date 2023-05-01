import { useEffect, useRef, useState } from 'react';

import useOnScreen from '../../hooks/useOnScreen';

import styles from './FadeIn.module.scss';

const FadeIn = ({ children, className, delay = '0s' }) => {
  const container = useRef(null);
  const isOnScreen = useOnScreen(container);
  const [executed, setExecuted] = useState(false);

  useEffect(() => isOnScreen && setExecuted(true), [isOnScreen]);

  return (
    <div
      ref={container}
      style={{ animationDelay: delay }}
      className={`${styles.container} ${
        // eslint-disable-next-line css-modules/no-undef-class
        executed ? styles['container--onScreen'] : ''
      } ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
