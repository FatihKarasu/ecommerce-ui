import React from "react";
import Order from "./Order";

export default function Orders({ user, orders }) {
  
  return (
    <>
      <div className="profile-header">
        <h4>Orders</h4>
      </div>
      {user.id !== "" && orders!==undefined
        ? orders.map((o) => <Order key={o.order.orderId} orderComplete={o} user={user} />)
        : null}
    </>
  );
}
