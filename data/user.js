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

export async function editUser(formData, config) {
  const response = await axios.post(`${API}/user/edit`, formData, config);
  return response.data;
}

export async function getUserById(userId, config) {
  const response = await axios.get(`${API}/user/${userId}`, config);
  return response.data;
}
