import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  hideNotification,
  removeNotification,
} from "../redux/notificationReducer";
import Notification from "./Notification";
let interval = null;
let lastLength = 0;
export default function NotificationContainer() {
  const notifications = useSelector(getNotifications);
  const [nc, setNc] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length > 0) {
      if (interval !== null) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        notifications.forEach(function (item) {
          if (Date.now() - item.lifeSpan > item.createdAt) {
            if (
              item.isHidden &&
              Date.now() - item.lifeSpan + 2000 > item.createdAt
            ) {
              dispatch(removeNotification(item.id));
            } else {
              dispatch(hideNotification(item.id));
            }
          }
        });
      }, 500);
    } else {
      clearInterval(interval);
      interval = null;
      lastLength = 0;
    }
    let temp = [];
    notifications.forEach((n, index) => {
      let isLast =
        index === notifications.length - 1 && lastLength < notifications.length
          ? true
          : false;

      temp.push(<Notification n={n} key={index} isLast={isLast} />);
    });
    lastLength = notifications.length;
    setNc(temp);
  }, [notifications]);
  return (
    <>
      {notifications.length === 0 ? null : (
        <div className="notification-container">{nc}</div>
      )}
    </>
  );
}
