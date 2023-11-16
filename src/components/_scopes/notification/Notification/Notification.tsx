'use client';

import { useEffect, useRef } from 'react';

import IconCloseOutline from '@/svg/IconCloseOutline';

import styles from './Notification.module.scss';

type Properties = {
  notification: {
    id: string;
    type: string;
    message: string;
  };
  removeNotification: (id: string) => void;
};

const Notification = ({ notification, removeNotification }: Properties) => {
  const timerID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerID.current = setTimeout(() => {
      removeNotification(notification.id);
    }, 6000);

    return () => {
      clearTimeout(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!notification) return;

  const stylesObject: { [key: string]: string } = {
    error: styles.error,
    success: styles.success,
    warning: styles.warning,
  };

  return (
    <div
      className={`${styles.notification} ${stylesObject[notification?.type]}`}
      key={notification.id}
    >
      <div className={styles.inner}>
        <span dangerouslySetInnerHTML={{ __html: notification?.message }} />
        <button
          type="button"
          className={styles.close}
          onClick={() => removeNotification(notification.id)}
        >
          <IconCloseOutline />
        </button>
      </div>
    </div>
  );
};

export default Notification;
