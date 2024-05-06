'use client';

import { useEffect, useRef } from 'react';

type Properties = {
  notification: { id: string; type: string; message: string };
  removeNotification: (id: string) => void;
};

const Notification = ({ notification, removeNotification }: Properties) => {
  const timerID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerID.current = setTimeout(() => {
      removeNotification(notification.id);
    }, 3000);

    return () => {
      clearTimeout(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!notification) return;

  const stylesObject: { [key: string]: string } = {
    error: 'bg-red-950 text-red-400 border border-red-400',
    success: 'bg-green-950 text-green-400 border border-green-400',
    warning: 'bg-yellow-950 text-yellow-400 border border-yellow-400',
  };

  return (
    <div
      className={`relative min-w-24 w-full mb-2 font-medium ${stylesObject[notification?.type]}`}
      key={notification.id}
    >
      <button
        type="button"
        className="top-0 right-0 text-lg p-4 w-full"
        onClick={() => removeNotification(notification.id)}
      >
        <span dangerouslySetInnerHTML={{ __html: notification?.message }} />
      </button>
    </div>
  );
};

export default Notification;
