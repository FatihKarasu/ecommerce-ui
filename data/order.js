import axios from "axios";
import { API } from "../data/base";

export async function getOrdersByUserId(userId, config) {
  const response = await axios.get(`${API}/order/user/${userId}`, config);
  return response.data;
}

export async function addOrder(
  user,
  deliveryId,
  billingId,
  dispatch,
  clearCart,
  router
) {
  const formData = new FormData();

  formData.append("UserId", user.id);
  formData.append("DeliveryAddressId", deliveryId);
  formData.append("BillingAddressId", billingId);
  
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  try {
    const response = await axios.post(`${API}/order`, formData, config);
    dispatch(clearCart());
    router.push("/");
    return true 
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    return false
  }
}
