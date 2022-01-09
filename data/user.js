import axios from "axios";
import { API } from "../data/base";

export async function logIn(formData, config) {
  const response = await axios.post(`${API}/user/login`, formData, config);
  return response.data;
}

export async function register(formData, config) {
  const response = await axios.post(`${API}/user/register`, formData, config);
  return response.data;
}

export async function editUser(user, values, dispatch, logout, router) {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  const formData = new FormData();
  formData.append("UserId", user.id);
  formData.append("UserName", values.userName);
  formData.append("Email", values.email);
  formData.append("Password", values.password);
  try {
    const response = await axios.post(`${API}/user/edit`, formData, config);
    return true;
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    return false;
  }
}

export async function getUserById(userId, config) {
  const response = await axios.get(`${API}/user/${userId}`, config);
  return response.data;
}
