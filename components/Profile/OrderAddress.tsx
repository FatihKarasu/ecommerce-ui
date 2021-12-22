import React from "react";

export default function OrderAddress({ address, title }) {
  return (
    <div className="order-address">
      <h5>{title}</h5>
      <div className="title">{address.title}</div>
      <div className="">{address.detail}</div>
      <div className="">
        {address.neighbourhood} / {address.district} / {address.city}
      </div>
      <div>
        {address.name} - {address.phoneNumber}
      </div>
    </div>
  );
}
