import Notification from './Notification';

type Properties = {
  notificationQueue: Array<{ id: string; type: string; message: string }>;
  removeNotification: (id: string) => void;
};

const NotificationPresenter = ({ notificationQueue, removeNotification }: Properties) => {
  if (!notificationQueue?.length) return '';

  return (
    <div className='fixed bottom-1 left-1 right-1 md:bottom-2 md:right-6 md:left-auto z-[999]'>
      {notificationQueue.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          removeNotification={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationPresenter;
