import React, { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import CartItem from "./CartItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCart, deleteItem, changeAmount } from "../redux/cartReducer";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userReducer";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
const APIBase = "http://localhost:5000";

export default function Cart({ show, onHide, user, setAmount }) {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    setAmount(cart.length);
  }, [cart]);
  const deleteCartItem = async (cartItemId) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.delete(
        `${APIBase}/cart/delete/${cartItemId}`,
        config
      );
      dispatch(deleteItem(cartItemId));
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        onHide();
      }
    }
  };
  const changeItemAmount = async (cartItemId, amount) => {
    if(amount<1)
    {
      return
    }
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const formData = new FormData();
    formData.append("CartItemId", cartItemId);
    formData.append("Amount", amount);
    try {
      const response = await axios.post(
        `${APIBase}/cart/changeamount`,
        formData,
        config
      );
      const obj = { cartItemId: cartItemId, amount: amount };
      dispatch(changeAmount(obj));
    } catch (error) {}
  };
  const goCheckout = () => {
    onHide()
    router.push(`/checkout`);
  };
  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {user.id === ""
            ? null
            : cart.map((item) => (
                <CartItem
                  key={item.cartItemId}
                  item={item}
                  deleteCartItem={deleteCartItem}
                  changeAmount={changeItemAmount}
                />
              ))}
          <Button type="button" onClick={()=>goCheckout()}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
