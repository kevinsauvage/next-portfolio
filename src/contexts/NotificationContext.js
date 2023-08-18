'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

const NotificationPresenter = dynamic(
  () => import('@/components/_scopes/notification/NotificationPresenter/NotificationPresenter'),
  { ssr: false }
);

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notificationQueue, setNotificationQueue] = useState([]);

  const enqueueNotification = (type, message) => {
    setNotificationQueue((previousQueue) => [
      ...previousQueue,
      { displayed: false, id: uuidv4(), message, type },
    ]);
  };

  const success = useCallback((message) => {
    enqueueNotification('success', message);
  }, []);

  const warning = useCallback((message) => {
    enqueueNotification('warning', message);
  }, []);

  const info = useCallback((message) => {
    enqueueNotification('info', message);
  }, []);

  const error = useCallback((message) => {
    enqueueNotification('error', message);
  }, []);

  const removeNotification = (id) => {
    setNotificationQueue((previousQueue) => previousQueue.filter((current) => current.id !== id));
  };

  const updateNotification = useCallback((updatedNotification) => {
    setNotificationQueue((previousQueue) =>
      previousQueue.map((current) =>
        current.id === updatedNotification.id ? updateNotification : current
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      error,
      info,
      notificationQueue,
      removeNotification,
      success,
      updateNotification,
      warning,
    }),
    [error, info, notificationQueue, success, updateNotification, warning]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {notificationQueue?.length > 0 && (
        <NotificationPresenter
          removeNotification={removeNotification}
          notificationQueue={notificationQueue}
        />
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
