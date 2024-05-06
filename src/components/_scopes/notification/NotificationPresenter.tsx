import Notification from './Notification';

type Properties = {
  notificationQueue: Array<{ id: string; type: string; message: string }>;
  removeNotification: (id: string) => void;
};

const NotificationPresenter = ({ notificationQueue, removeNotification }: Properties) => {
  if (!notificationQueue?.length) return '';

  return (
    <div className="fixed top-2 right-2 md:top-0 md:right-0 z-50">
      {notificationQueue.map((notification) => (
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
