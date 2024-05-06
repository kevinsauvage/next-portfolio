'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { v4 as uuidv4 } from 'uuid';

type NotificationType = {
  displayed: boolean;
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
};

type NotificationProviderProperties = {
  children: ReactNode;
};

type NotificationContextType = {
  error: (message: string) => void;
  info: (message: string) => void;
  notificationQueue: Array<NotificationType>;
  removeNotification: (id: string) => void;
  success: (message: string) => void;
  updateNotification: (updatedNotification: NotificationType) => void;
  warning: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationPresenter = dynamic(
  () => import('@/components/_scopes/notification/NotificationPresenter'),
  { ssr: false },
);

const NotificationProvider = ({ children }: NotificationProviderProperties) => {
  const [notificationQueue, setNotificationQueue] = useState<Array<NotificationType>>([]);

  const enqueueNotification = (type: 'success' | 'warning' | 'info' | 'error', message: string) => {
    setNotificationQueue((previousQueue) => [
      ...previousQueue,
      { displayed: false, id: uuidv4(), message, type },
    ]);
  };

  const success = useCallback((message: string) => {
    enqueueNotification('success', message);
  }, []);

  const warning = useCallback((message: string) => {
    enqueueNotification('warning', message);
  }, []);

  const info = useCallback((message: string) => {
    enqueueNotification('info', message);
  }, []);

  const error = useCallback((message: string) => {
    enqueueNotification('error', message);
  }, []);

  const removeNotification = (id: string) => {
    setNotificationQueue((previousQueue) => previousQueue.filter((current) => current.id !== id));
  };

  const updateNotification = useCallback((updatedNotification: NotificationType) => {
    setNotificationQueue((previousQueue) =>
      previousQueue.map((current) =>
        current.id === updatedNotification.id ? updatedNotification : current,
      ),
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
    [error, info, notificationQueue, success, updateNotification, warning],
  );

  return (
    <NotificationContext.Provider value={value}>
      {notificationQueue?.length > 0 && (
        <NotificationPresenter
          removeNotification={removeNotification}
          notificationQueue={notificationQueue}
        />
      )}
      {children}
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
