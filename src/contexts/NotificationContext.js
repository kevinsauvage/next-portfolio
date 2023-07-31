// contexts/NotificationContext.js
import { createContext, useContext, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationQueue, setNotificationQueue] = useState([]);

  const enqueueNotification = (message, type) => {
    setNotificationQueue((previousQueue) => [...previousQueue, { id: uuidv4(), message, type }]);
  };

  const dequeueNotification = () => {
    setNotificationQueue((previousQueue) => previousQueue.slice(1));
  };

  const removeNotification = (id) => {
    setNotificationQueue((previousQueue) => previousQueue.filter((current) => current.id !== id));
  };

  const value = useMemo(
    () => ({ dequeueNotification, enqueueNotification, notificationQueue, removeNotification }),
    [notificationQueue]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
