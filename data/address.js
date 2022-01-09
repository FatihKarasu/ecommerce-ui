import axios from "axios";
import { API } from "../data/base";

export const getAddresses = async (
  user,
  setAddresses,
  dispatch,
  logout,
  router
) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.get(`${API}/address/user/${user.id}`, config);

    setAddresses(response.data);
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
  }
};
export const getAddress = async (
  user,
  addressId,
  setAddress,
  dispatch,
  logout,
  router
) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.get(`${API}/address/${addressId}`, config);

    setAddress(response.data);
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
  }
};
export const addNewAddress = async (
  address,
  user,
  setAddresses,
  addresses,
  dispatch,
  logout,
  addNotification,
  router
) => {
  const formData = new FormData();
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
    const response = await axios.post(`${API}/address`, formData, config);

    setAddresses([...addresses, response.data]);
    dispatch(addNotification({notification:"Address Added",variant:"success",lifeSpan:3000}))
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    dispatch(addNotification({notification:"Error",variant:"danger",lifeSpan:3000}))
  }
};

export const editAddress = async (
  address,
  user,
  changeAddress,
  dispatch,
  logout,
  addNotification,
  router
) => {
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
    const response = await axios.post(`${API}/address/edit`, formData, config);
    changeAddress(address);
    dispatch(addNotification({notification:"Address Updated",variant:"success",lifeSpan:3000}))
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    dispatch(addNotification({notification:"Error",variant:"danger",lifeSpan:3000}))
  }
};

export const deleteAddress = async (
  addressId,
  user,
  setAddresses,
  addresses,
  dispatch,
  logout,
  addNotification,
  router
) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.delete(
      `${API}/address/delete/${addressId}`,
      config
    );

    var filtered = addresses.filter(
      (address) => address.addressId !== addressId
    );
    setAddresses(filtered);
    dispatch(addNotification({notification:"Address Deleted",variant:"warning",lifeSpan:3000}))
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    if (error.response.status == 500) {
      console.log(error);
    }
    dispatch(addNotification({notification:"Delete",variant:"danger",lifeSpan:3000}))
  }
};
