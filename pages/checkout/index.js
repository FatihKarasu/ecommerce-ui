import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "react-bootstrap";
import Link from "next/link";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getCart, deleteItem, changeAmount } from "../../redux/cartReducer";
import { getUser, logout } from "../../redux/userReducer";
import Product from "../../components/Checkout/Product";
import Address from "../../components/Checkout/Address";
import Payment from "../../components/Checkout/Payment";
import { deleteCartItem, changeItemAmount } from "../../data/cart";
import {
  editAddress,
  getAddresses,
  addNewAddress,
  deleteAddress,
} from "../../data/address";

const initialValues = {
  deliveryAddress: "1",
  billingAddress: "1",
  name: "",
  cardNumber: "",
  month: "",
  year: "",
  cvv: null,
  type: 1,
};

const initialFeedbackValues = {
  monthIsInvalid: false,
  monthFeedback: "",
  yearIsInvalid: false,
  yearFeedback: "",
};

export default function checkout() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [validated, setValidated] = useState(false);
  const [paymentData, setPaymentData] = useState(initialValues);
  const [feedback, setFeedback] = useState(initialFeedbackValues);
  const router = useRouter();
  const cart = useSelector(getCart);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getAddresses(user, setAddresses, dispatch, logout, router);
  }, []);
  useEffect(() => {
    if (user.id === "") {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (cart.length !== 0) {
      let total = 0;
      cart.forEach((item) => {
        total += item.amount * item.product.productPrice;
      });
      setTotalPrice(total);
    }
  }, [cart]);

  const changeitemamount = async (cartItemId, amount) => {
    changeItemAmount(cartItemId, amount, user, dispatch, changeAmount);
  };

  const deletecartitem = async (cartItemId) => {
    deleteCartItem(cartItemId, user, dispatch, deleteItem, logout, null);
  };

  const editaddress = async (address) => {
    editAddress(address, user, changeAddress, dispatch, logout, router);
  };
  const changeAddress = (address) => {
    const temp = [...addresses];

    for (let index = 0; index < temp.length; index++) {
      if (temp[index].addressId === address.addressId) {
        temp[index] = address;
      }
    }

    setAddresses(temp);
  };

  const deleteaddress = async (addressId) => {
    deleteAddress(
      addressId,
      user,
      setAddresses,
      addresses,
      dispatch,
      logout,
      router
    );
  };

  const order = () => {
    setValidated(true);
  };
  const handleInput = (e) => {
    var year = new Date().getFullYear().toString().substr(-2);
    var maxYear = (new Date().getFullYear() + 11).toString().substr(-2);
    var month = new Date().getMonth() + 1;

    let { name, value } = e.target;
    if (name === "month") {
      const obj = { ...feedback, monthIsInvalid: false, monthFeedback: "" };
      setFeedback(obj);
      if (
        paymentData.year === "" ||
        parseInt(paymentData.year) >= parseInt(year)
      ) {
        if (parseInt(value) > 1 && parseInt(value) < 10 && value[0] !== "0") {
          value = `0${value}`;
        }
        if (parseInt(value) > 12) {
          const obj = {
            ...feedback,
            monthIsInvalid: true,
            monthFeedback: "Please enter valid month",
          };
          setFeedback(obj);
        }
      }
      if (paymentData.year === year) {
        if (value < month || value > 12) {
          const obj = {
            ...feedback,
            monthIsInvalid: true,
            monthFeedback: "Please enter valid month",
          };
          setFeedback(obj);
        }
      }
    } else if (name === "year") {
      setFeedback(initialValues);
      if (
        parseInt(value) < parseInt(year) ||
        parseInt(value) > parseInt(maxYear)
      ) {
        const obj = {
          ...feedback,
          yearIsInvalid: true,
          yearFeedback: "Please enter valid year",
        };
        setFeedback(obj);
      }
      if (
        parseInt(value) === parseInt(year) &&
        paymentData.month !== "" &&
        parseInt(paymentData.month) < parseInt(month)
      ) {
        const obj = {
          yearIsInvalid: false,
          yearFeedback: "",
          monthIsInvalid: true,
          monthFeedback: "Please enter valid month",
        };
        setFeedback(obj);
      }
    }
    if (name === "cardNumber") {
      if (value.length === 5) {
        if (value[value.length - 1] !== " ") {
          value =
            value.substring(0, value.length - 1) +
            " " +
            value[value.length - 1];
        }
      }
      if (value.length === 10) {
        if (value[value.length - 1] !== " ") {
          value =
            value.substring(0, value.length - 1) +
            " " +
            value[value.length - 1];
        }
      }
      if (value.length === 15) {
        if (value[value.length - 1] !== " ") {
          value =
            value.substring(0, value.length - 1) +
            " " +
            value[value.length - 1];
        }
      }
    }
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };
  //.replace(/\s/g, ''); remove spaces
  const handleAddress = (type, id) => {
    setPaymentData({
      ...paymentData,
      [type]: id,
    });
  };
  return (
    <div className="container checkout-container">
      <Head>
        <title>Checkout</title>
        <meta name="keyword" content="E commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user.id !== "" ? (
        <div className="row">
          <div className="breadcrumb">
            <nav aria-label="breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="active">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-9 checkout">
            <h3>Delivery Address</h3>
            <div className="address-container">
              {addresses.map((address) => (
                <Address
                  key={address.addressId}
                  address={address}
                  selected={paymentData.deliveryAddress === address.addressId}
                  type="deliveryAddress"
                  deleteAddress={() => deleteaddress(address.addressId)}
                  editAddress={editaddress}
                  changeAddress={handleAddress}
                />
              ))}
            </div>
            <h3>Billing Address</h3>
            <div className="address-container">
              {addresses.map((address) => (
                <Address
                  key={address.addressId}
                  address={address}
                  selected={paymentData.billingAddress === address.addressId}
                  type="billingAddress"
                  deleteAddress={() => deleteaddress(address.addressId)}
                  editAddress={editaddress}
                  changeAddress={handleAddress}
                />
              ))}
            </div>

            <div className="payment">
              <h4>Payment</h4>
              <Payment
                values={paymentData}
                handleOnChange={handleInput}
                validated={validated}
                feedback={feedback}
              />
            </div>
          </div>
          <div className="col-3 cart">
            <h4>Cart</h4>
            <div className="product-container">
              {cart.length === 0
                ? null
                : cart.map((item) => (
                    <Product
                      key={item.cartItemId}
                      item={item}
                      changeItemAmount={changeitemamount}
                      deleteCartItem={deletecartitem}
                    />
                  ))}

              <div className="product">
                <div className="price">
                  <h5>Total :</h5>
                  <h5>{totalPrice} ₺</h5>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              type="button"
              onClick={() => setValidated(true)}
            >
              Save
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
