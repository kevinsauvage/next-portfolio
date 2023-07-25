// components/Notification.js
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useNotification } from '@/contexts/NotificationContext';
import IconCloseOutline from '@/svg/IconCloseOutline';

import styles from './Notification.module.scss';

const Notification = () => {
  const { notificationQueue, dequeueNotification, removeNotification } = useNotification();

  useEffect(() => {
    if (notificationQueue.length > 0) {
      const timer = setTimeout(() => {
        dequeueNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dequeueNotification, notificationQueue]);

  const getStyles = (type) => {
    if (type === 'warn') return styles.warn;
    if (type === 'error') return styles.error;
    if (type === 'success') return styles.success;
  };

  if (!notificationQueue?.length) return '';

  return createPortal(
    <div className={styles.container}>
      {notificationQueue?.map((currentNotification) => (
        <div
          className={`${styles.notification} ${getStyles(currentNotification.type)}`}
          key={currentNotification.id}
        >
          <span>{currentNotification.message}</span>
          <button
            type="button"
            className={styles.close}
            onClick={() => removeNotification(currentNotification.id)}
          >
            <IconCloseOutline />
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default Notification;
