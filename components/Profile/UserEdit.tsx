import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../redux/userReducer";
import { useRouter } from "next/router";
import { editUser,getUserById } from "../../data/user";
import { addNotification } from "../../redux/notificationReducer";
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
      const response = await getUserById(user.id, config);

      setEditValues({ ...editValues, ...response });
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
    if(await editUser(user,editValues,dispatch,logout,router))
    {
      dispatch(addNotification({notification:"Updated Successfully",variant:"success",lifeSpan:3000}))
    }
    else 
    {
      dispatch(addNotification({notification:"Update Failed. Please Try Again",variant:"danger",lifeSpan:3000}))
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
      <div className="profile-header">
        <h4>Profile</h4>
      </div>
      <Form className="mt-3">
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
      <Button variant="primary" type="button" onClick={() => saveChanges()}>
        Save
      </Button>
    </div>
  );
}
