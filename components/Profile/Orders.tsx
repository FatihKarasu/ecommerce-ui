import React from "react";
import Order from "../Order";

export default function Orders({ user, orders }) {
  return (
    <>
      <div className="profile-header">
        <h4>Orders</h4>
      </div>
      {user.id !== ""
        ? orders.map((order) => <Order key={order.orderId} order={order} />)
        : null}
    </>
  );
}
