'use client';

import { useEffect, useRef } from 'react';

import clsx from 'clsx';

type Properties = {
  notification: { id: string; type: string; message: string };
  removeNotification: (id: string) => void;
};

const Notification = ({ notification, removeNotification }: Properties) => {
  const timerID = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      removeNotification(notification.id);
    }, 3000);

    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!notification) return;

  const stylesObject: { [key: string]: string } = {
    error: 'text-red-400 border border-red-400',
    success: 'text-green-400 border border-green-400',
    warning: 'text-yellow-400 border border-yellow-400',
  };

  return (
    <div
      className={clsx(
        'relative min-w-24 max-w-80 w-full mb-2 bg-zinc-950 border font-medium',
        stylesObject[notification?.type],
      )}
      key={notification.id}
    >
      <button
        type='button'
        className='bottom-2 right-2 text-lg p-4 w-full'
        onClick={() => removeNotification(notification.id)}
      >
        <span dangerouslySetInnerHTML={{ __html: notification?.message }} />
      </button>
    </div>
  );
};

export default Notification;
