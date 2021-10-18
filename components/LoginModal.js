import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../redux/userReducer";
import { populateCart } from "../redux/cartReducer";
import axios from "axios";

const APIBase = "http://localhost:5000";

const initialLoginValues = {
  email: "",
  password: "",
};

const initialSignUpValues = {
  userName: "",
  email: "",
  password: "",
  passwordAgain: "",
};

export default function Login({ show, onHide }) {
  const [type, setType] = useState("login");
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [signUpValues, setSignUpValues] = useState(initialSignUpValues);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger");

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      setDefault();
      setType("login");
    }
  }, [show]);

  const setDefault = () => {
    setLoginValues(initialLoginValues);
    setSignUpValues(initialSignUpValues);
    setMessage("");
    setVariant("danger");
  };

  const performLogin = async () => {
    if (loginValues.email === "" || loginValues.password === "") {
      setMessage("Please Enter Your Email and Password.");
      return;
    }
    const formData = new FormData();
    formData.append("Email", loginValues.email);
    formData.append("Password", loginValues.password);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${APIBase}/user/login`,
      formData,
      config
    );
   
    setMessage(response.data.message);
    setVariant(response.data.status);
    if(response.data.status==="success")
    {
      const cart = await axios.get(`${APIBase}/cart/user/${response.data.userId}`, config);
      setTimeout(() => {
        const user = { id: response.data.userId, token: response.data.token };
        dispatch(login(user));
        dispatch(populateCart(cart.data))
        onHide();
      }, 2000);
    }
    
  };

  const performSignUp = async () => {
    if (signUpValues.userName === "") {
      setMessage("Please Enter Your User Name.");
      return;
    }
    if (signUpValues.email === "") {
      setMessage("Please Enter Your Email.");
      return;
    }
    if (!validateEmail(signUpValues.email)) {
      setMessage("Please Enter A Proper Email.");
      return;
    }
    if (signUpValues.password === "") {
      setMessage("Please Enter Your Password.");
      return;
    }
    if (signUpValues.passwordAgain === "") {
      setMessage("Please Enter Your Password Again.");
      return;
    }
    if (signUpValues.password !== signUpValues.passwordAgain) {
      setMessage("Please Enter Same Password.");
      return;
    }
    const formData = new FormData();
    formData.append("UserName", signUpValues.userName);
    formData.append("Email", signUpValues.email);
    formData.append("Password", signUpValues.password);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${APIBase}/user/register`,
      formData,
      config
    );

    setMessage(response.data.message);
    setVariant(response.data.status);
    setTimeout(() => {
      onHide();
    }, 2000);
  };

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const handleSignUpInput = (e) => {
    const { name, value } = e.target;
    setSignUpValues({
      ...signUpValues,
      [name]: value,
    });
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {type === "login" ? "Login" : "Sign Up"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "login" ? (
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={loginValues.email}
                onChange={handleLoginInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginValues.password}
                onChange={handleLoginInput}
              />
            </Form.Group>
            <div className="modal-text">
              Don't have an account?
              <p
                className="modal-link"
                onClick={() => {
                  setType("signup");
                  setDefault();
                }}
              >
                Sign Up
              </p>
            </div>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="formText">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="userName"
                value={signUpValues.userName}
                onChange={handleSignUpInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={signUpValues.email}
                onChange={handleSignUpInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={signUpValues.password}
                onChange={handleSignUpInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPasswordAgain">
              <Form.Label>Password Again</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password Again"
                name="passwordAgain"
                value={signUpValues.passwordAgain}
                onChange={handleSignUpInput}
              />
            </Form.Group>
            <div className="modal-text">
              Already have an account?
              <p
                className="modal-link"
                onClick={() => {
                  setType("login");
                  setDefault();
                }}
              >
                Log In
              </p>
            </div>
          </Form>
        )}
      </Modal.Body>
      {message === "" ? null : (
        <div className="text-center">
          <Alert variant={variant}>
            {message}{" "}
            {variant === "success" ? (
              <Spinner animation="border" variant="success" size="sm" />
            ) : null}
          </Alert>
        </div>
      )}
      <Modal.Footer>
        {type === "login" ? (
          <Button
            variant="primary"
            type="submit"
            onClick={() => performLogin()}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="primary"
            type="submit"
            onClick={() => performSignUp()}
          >
            Sign Up
          </Button>
        )}
        <Button variant="danger" type="button" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
