import Notification from '../Notification/Notification';

import styles from './NotificationPresenter.module.scss';

const NotificationPresenter = ({ notificationQueue, removeNotification }) => {
  if (!notificationQueue?.length) return '';

  return (
    <div className={styles.container} aria-label="test">
      {notificationQueue.map((notification) => (
        <Notification
          key={notification.id}
          notif={notification}
          removeNotification={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationPresenter;
