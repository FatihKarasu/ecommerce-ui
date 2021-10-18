import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "react-bootstrap";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getCart, deleteItem, changeAmount } from "../../redux/cartReducer";
import axios from "axios";
import { getUser, logout } from "../../redux/userReducer";
import Product from "../../components/Checkout/Product";
import Address from "../../components//Checkout/Address";
import Payment from "../../components//Checkout/Payment";
const APIBase = "http://localhost:5000";

const initialValues = {
  deliveryAddress: "1",
  billingAddress: "1",
  name: "",
  cardNumber: null,
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
    getAddresses();
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
        total += item.amount * item.productPrice;
      });
      setTotalPrice(total);
    }
  }, [cart]);

  const changeItemAmount = async (cartItemId, amount) => {
    if (amount < 1) {
      return;
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
      }
    }
  };

  const getAddresses = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.get(
        `${APIBase}/address/user/${user.id}`,
        config
      );

      setAddresses(response.data);
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
  };

  const editAddress = async (address) => {
    const formData = new FormData();
    formData.append("AddressId", address.addressId);
    formData.append("UserId", user.id);
    formData.append("Name", address.name);
    formData.append("Detail", address.detail);
    formData.append("District", address.district);
    formData.append("City", address.city);
    formData.append("Neighbourhood", address.neighbourhood);
    formData.append("PhoneNumber", address.phoneNumber);
    formData.append("Title", address.title);

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      const response = await axios.post(
        `${APIBase}/address/edit`,
        formData,
        config
      );
      changeAddress(address);
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
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

  const deleteAddress = async (addressId) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.delete(
        `${APIBase}/address/delete/${addressId}`,
        config
      );

      var filtered = addresses.filter(
        (address) => address.addressId !== addressId
      );
      setAddresses(filtered);
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
      if (error.response.status == 500) {
        console.log(error);
      }
    }
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
      if (paymentData.year === "" || parseInt(paymentData.year) >= parseInt(year)) {
        console.log(value);
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
      console.log(typeof(value))
      console.log(typeof(year))
      console.log(value<year)
      if (parseInt(value) < parseInt(year) || parseInt(value) > parseInt(maxYear)) {
        const obj = {
          ...feedback,
          yearIsInvalid: true,
          yearFeedback: "Please enter valid year",
        };
        setFeedback(obj);
      }
      if (parseInt(value) === parseInt(year) && paymentData.month!=="" && parseInt(paymentData.month)<parseInt(month)) {
        const obj = {
          yearIsInvalid: false,
          yearFeedback: "",
          monthIsInvalid: true,
          monthFeedback: "Please enter valid month",
        };
        setFeedback(obj);
      }
    }

    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

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
          <div className="col-9 checkout">
            <h3>Delivery Address</h3>
            <div className="address-container">
              {addresses.map((address) => (
                <Address
                  key={address.addressId}
                  address={address}
                  selected={paymentData.deliveryAddress === address.addressId}
                  type="deliveryAddress"
                  deleteAddress={() => deleteAddress(address.addressId)}
                  editAddress={editAddress}
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
                  deleteAddress={() => deleteAddress(address.addressId)}
                  editAddress={editAddress}
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
                      changeItemAmount={changeItemAmount}
                      deleteCartItem={deleteCartItem}
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
