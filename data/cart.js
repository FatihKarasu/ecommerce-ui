import axios from "axios";
import { API } from "../data/base";

export async function getCartByUserId(userId) {
  const response = await axios.get(`${API}/cart/user/` + userId);
  return response.data;
}

export async function addtocart(formData, config) {
  const response = await axios.post(`${API}/cart/add`, formData, config);

  return response.data;
}

export const deleteCartItem = async (cartItemId,user,dispatch,deleteItem,logout,onHide) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.delete(
      `${API}/cart/delete/${cartItemId}`,
      config
    );
    dispatch(deleteItem(cartItemId));
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      if(onHide!==null)
      {
        onHide();
      }
     
    }
  }
};

export const changeItemAmount = async (
  cartItemId,
  amount,
  user,
  dispatch,
  changeAmount
) => {
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
      `${API}/cart/changeamount`,
      formData,
      config
    );
    const obj = { cartItemId: cartItemId, amount: amount };
    dispatch(changeAmount(obj));
  } catch (error) {}
};
