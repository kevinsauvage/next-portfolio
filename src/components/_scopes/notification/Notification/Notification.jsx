'use client';

import { useEffect, useRef } from 'react';

import IconCloseOutline from '@/svg/IconCloseOutline';

import styles from './Notification.module.scss';

const Notification = ({ notif, removeNotification }) => {
  const timerID = useRef(null);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      removeNotification(notif.id);
    }, 4000);

    return () => {
      clearTimeout(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!notif) return;

  const stylesObject = {
    error: styles.error,
    success: styles.success,
    warning: styles.warn,
  };

  return (
    <div className={`${styles.notification} ${stylesObject[notif?.type]}`} key={notif.id}>
      <div className={styles.inner}>
        <span>{notif.message}</span>
        <button type="button" className={styles.close} onClick={() => removeNotification(notif.id)}>
          <IconCloseOutline />
        </button>
      </div>
    </div>
  );
};

export default Notification;
