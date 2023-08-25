import "./notification.style.css";
import { CreateNotification } from "./components/CreateNotification";
import { NotificationList } from "./components/NotificationList";

export const Notification = () => {
  return (
    <div className="notification-main">
      <CreateNotification />
      <NotificationList />
    </div>
  );
};
