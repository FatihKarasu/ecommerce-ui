import React, { useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { getCart, deleteItem, changeAmount } from "../redux/cartReducer";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userReducer";
import { deleteCartItem, changeItemAmount } from "../data/cart";
import { useRouter } from "next/router";

export default function Cart({ show, onHide, user, setAmount }) {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    setAmount(cart.length);
  }, [cart]);
  const deletecartitem = async (cartItemId) => {
    deleteCartItem(cartItemId, user, dispatch, deleteItem, logout, onHide);
  };
  const changeitemamount = async (cartItemId, amount) => {
    changeItemAmount(cartItemId, amount, user, dispatch, changeAmount);
  };
  const goCheckout = () => {
    onHide();
    router.push(`/checkout`);
  };
  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <div>Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                deleteCartItem={deletecartitem}
                changeAmount={changeitemamount}
              />
            ))
          )}
        </Offcanvas.Body>{" "}
        {cart.length === 0 ? null : (
          <div className="d-flex w-100 justify-content-center my-3">
            <Button type="button" onClick={() => goCheckout()}>
              Checkout
            </Button>
          </div>
        )}
      </Offcanvas>
    </>
  );
}
