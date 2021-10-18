import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../redux/userReducer";
import axios from "axios";
import { useRouter } from "next/router";

const APIBase = "http://localhost:5000";

const initialState = {
  userName: "",
  email: "",
  password: "",
  passwordAgain: "",
};
interface IUser {
  userName: string;
  email: string;
  password: string;
  passwordAgain: string;
}
export default function UserEdit() {
  const [editValues, setEditValues] = useState<IUser>(initialState);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger");
  const user = useSelector(getUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.get(`${APIBase}/user/${user.id}`, config);

      setEditValues({ ...editValues, ...response.data });
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
  };

  const saveChanges = async () => {
    if (!validateEmail(editValues.email)) {
      setMessage("Please Enter A Proper Email.");
      return;
    }
    if (editValues.password !== editValues.passwordAgain) {
      setMessage("Please Enter Same Password.");
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const formData = new FormData();
    formData.append("UserId", user.id);
    formData.append("UserName", editValues.userName);
    formData.append("Email", editValues.email);
    formData.append("Password", editValues.password);
    try {
      const response = await axios.post(
        `${APIBase}/user/edit`,
        formData,
        config
      );
      setMessage(response.data.message)
      setVariant(response.data.status)
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (user.id !== "") {
      getUserData();
    }
  }, [user]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="userName"
            value={editValues.userName}
            onChange={handleInput}
          />
          <Form.Text className="text-muted">
            Leave empty or same if you do not want to change.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={editValues.email}
            onChange={handleInput}
          />
          <Form.Text className="text-muted">
            Leave empty or same if you do not want to change.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={editValues.password}
            onChange={handleInput}
          />
          <Form.Text className="text-muted">
            Leave empty or same if you do not want to change.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPasswordAgain">
          <Form.Label>Password Again</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password Again"
            name="passwordAgain"
            value={editValues.passwordAgain}
            onChange={handleInput}
          />
        </Form.Group>
      </Form>
      {message}
      <Button variant="primary" type="button" onClick={()=>saveChanges()}>
        Save
      </Button>
    </div>
  );
}
