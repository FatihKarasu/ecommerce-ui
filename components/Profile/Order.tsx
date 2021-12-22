import React, { useEffect, useState } from "react";
import OrderProduct from "./OrderProduct";
import OrderAddress from "./OrderAddress";
import { getAddress } from "../../data/address";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../redux/userReducer";

export default function Order({ orderComplete, user }) {
  const [open, setOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const { order, orderProducts } = orderComplete;
  const router = useRouter();
  const dispatch = useDispatch();
  let images = [];
  const getTotalPrice = () => {
    let totalPrice = 0;
    orderProducts.forEach((p) => {
      totalPrice += parseInt(p.product.productPrice) * p.amount;
    });
    return totalPrice;
  };
  for (let index = 0; index < orderProducts.length; index++) {
    if (index == 2) {
      if (orderProducts.length == 3) {
        images.push(
          <img
            key={index}
            src={orderProducts[index].product.productImage}
            className="image-item"
          />
        );
      } else {
        images.push(
          <div className="image-item" key={index}>
            <span>+{orderProducts.length - index}</span>
          </div>
        );
      }
      break;
    }
    images.push(
      <img
        key={index}
        src={orderProducts[index].product.productImage}
        className="image-item"
      />
    );
  }
  useEffect(() => {
    if (open && deliveryAddress === null) {
      getAddress(
        user,
        order.deliveryAddressId,
        setDeliveryAddress,
        dispatch,
        logout,
        router
      );
      if (order.deliveryAddressId !== order.billingAddressId) {
        getAddress(
          user,
          order.billingAddressId,
          setBillingAddress,
          dispatch,
          logout,
          router
        );
      }
    }
  }, [open]);
  return (
    <div className={open ? "order open" : "order"}>
      <div className="order-summary" onClick={() => setOpen(!open)}>
        <div className="images">{images}</div>
        <div className="order-info">
          <div className="order-date">{order.orderDate}</div>
          <div className="order-status">{order.orderStatus}</div>
          <div className="d-flex flex-column">
            <div className="total-price">{getTotalPrice()} TL</div>
            <div className="payment-method">{order.paymentMethod}</div>
          </div>
        </div>
        {open ? (
          <i className="fas fa-chevron-up"></i>
        ) : (
          <i className="fas fa-chevron-down"></i>
        )}
      </div>

      <div className="order-details ">
        {open ? (
          <div>
            <div className="products">
              {orderProducts.map((p, index) => (
                <OrderProduct key={index} orderProduct={p} />
              ))}
            </div>
            {deliveryAddress !== null ? (
              <div className="d-flex justify-content-between p-3">
                <OrderAddress
                  address={deliveryAddress}
                  title="Delivery Address"
                />
                {billingAddress !== null ? (
                  <OrderAddress
                    address={billingAddress}
                    title="Billing Address"
                  />
                ) : (
                  <OrderAddress
                    address={deliveryAddress}
                    title="Billing Address"
                  />
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
