'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Loader from '../Loader/Loader';

import styles from './splashScreen.module.scss';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splashScreen"
          initial={{
            background:
              'radial-gradient(circle, rgba(var(--rgb-color-background-1),0) 0%, rgba(var(--rgb-color-background-1),1) 0%)',
            opacity: 1,
          }}
          animate={{
            background:
              'radial-gradient(circle, rgba(var(--rgb-color-background-1),0) 0%, rgba(var(--rgb-color-background-1),1) 0%)',
            opacity: 1,
          }}
          exit={{
            background:
              'radial-gradient(circle, rgba(var(--rgb-color-background-1),0) 100%, rgba(var(--rgb-color-background-1),1) 100%)',
            opacity: 0,
          }}
          className={styles.splashScreen}
        >
          <Loader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
