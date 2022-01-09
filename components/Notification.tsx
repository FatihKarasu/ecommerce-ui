import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../redux/notificationReducer";
export default function Notification({ n ,isLast}) {

  return (
    <div className={`notification ${n.variant} ${n.isHidden ? "hide" : ""} ${isLast?"move":""}`}>
      {n.notification}
    </div>
  );
}
