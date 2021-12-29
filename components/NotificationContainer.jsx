import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  removeNotification,
} from "../redux/notificationReducer";
let lastLength = 0;
export default function NotificationContainer() {
  const notifications = useSelector(getNotifications);
  const [nc, setNc] = useState([]);
  const dispatch = useDispatch();

  if (notifications.length > lastLength) {
    setTimeout(() => move(), 3000);
  }

  const remove = () => {
    if (process.browser) {
      if (document.getElementById("first") !== null) {
        let first = document.getElementById("first");
        console.log(
          first.offsetHeight +
            parseInt(window.getComputedStyle(first).marginTop)
        );
        first.style.transform = `translate(0,-${
          first.offsetHeight +
          parseInt(window.getComputedStyle(first).marginTop)
        }px)`;
      } else if (document.getElementById("last") !== null) {
        let first = document.getElementById("last");
        console.log(
          first.offsetHeight +
            parseInt(window.getComputedStyle(first).marginTop)
        );
        first.style.transform = `translate(0,-${
          first.offsetHeight +
          parseInt(window.getComputedStyle(first).marginTop)
        }px)`;
      }
    }
    setTimeout(() => {
      dispatch(removeNotification());
    }, 500);
  };

  const move = () => {
    if (process.browser) {
      try {
        let elems = document.getElementsByClassName("notification");
        let firstHeight =
          elems[0].offsetHeight +
          parseInt(window.getComputedStyle(elems[0]).marginTop) +
          parseInt(window.getComputedStyle(elems[0]).marginBottom);
        console.log(firstHeight);
        for (let index = 0; index < elems.length; index++) {
          elems[index].style.transform = `translate(0,-${firstHeight}px)`;
        }
      } catch (error) {}
    }
    setTimeout(() => {
      clear();
    }, 500);
  };
  const clear = () => {
    if (process.browser) {
      try {
        let elems = document.getElementsByClassName("notification");
        for (let index = 0; index < elems.length; index++) {
          elems[index].style.transform = "";
        }
      } catch (error) {}
    }
    dispatch(removeNotification());
  };
  useEffect(() => {
    let temp = [];
    notifications.forEach((n, index) => {
      if (
        notifications.length - 1 === index &&
        lastLength < notifications.length
      ) {
        temp.push(
          <div
            className={`notification ${n.variant} last `}
            key={index}
            id="last"
          >
            {n.notification}
          </div>
        );
      } else if (index === 0) {
        temp.push(
          <div className={`notification ${n.variant} `} key={index} id="first">
            {n.notification}
          </div>
        );
      } else {
        temp.push(
          <div className={`notification ${n.variant} `} key={index}>
            {n.notification}
          </div>
        );
      }
    });
    setNc(temp);
    lastLength = notifications.length;
  }, [notifications]);
  useEffect(() => {
    if (
      process.browser &&
      nc.length !== 0 &&
      document.getElementById("last") !== null
    ) {
      document.getElementById("last").classList.remove("last");
    }
  }, [nc]);

  return (
    <>
      {notifications.length === 0 ? null : (
        <div className="notification-container">{nc}</div>
      )}
    </>
  );
}
