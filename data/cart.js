import axios from "axios";
import { API } from "../data/base";

export async function getCartByUserId(userId) {
  const response = await axios.get(`${API}/cart/user/` + userId);
  return response.data;
}

export async function addtocart(user,productId,selectedColor,selectedSize,amount,dispatch,logout,addToCart) {
  if (user.id === "") {
    return;
  }
  const formData = new FormData();
  formData.append("UserId", user.id);
  formData.append("ProductId", productId);
  formData.append("ColorId", selectedColor);
  formData.append("SizeId", selectedSize);
  formData.append("Amount", amount);
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.post(`${API}/cart/add`, formData, config);
    dispatch(addToCart(response.data));
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
    }
  }
 
}

export const deleteCartItem = async (
  cartItemId,
  user,
  dispatch,
  deleteItem,
  logout,
  onHide
) => {
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
      if (onHide !== null) {
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

