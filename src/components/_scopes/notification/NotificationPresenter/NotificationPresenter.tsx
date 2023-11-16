import Notification from '../Notification/Notification';

import styles from './NotificationPresenter.module.scss';

type Properties = {
  notificationQueue: Array<
    {
      id: string;
      type: string;
      message: string;
    } & {
      id: string;
      type: string;
      message: string;
    }
  >;
  removeNotification: (id: string) => void;
};

const NotificationPresenter = ({ notificationQueue, removeNotification }: Properties) => {
  if (!notificationQueue?.length) return '';

  return (
    <div className={styles.container} aria-label="test">
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
