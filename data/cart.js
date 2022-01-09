import axios from "axios";
import { API } from "../data/base";

export async function getCartByUserId(userId) {
  const response = await axios.get(`${API}/cart/user/` + userId);
  return response.data;
}

export async function addtocart(user,productId,selectedColor,selectedSize,amount,dispatch,logout,addNotification,addToCart) {
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
    dispatch(addNotification({notification:"Product Added",variant:"success",lifeSpan:3000}))
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
    }
    dispatch(addNotification({notification:"Error While Adding",variant:"danger",lifeSpan:3000}))
  }
 
}

export const deleteCartItem = async (
  cartItemId,
  user,
  dispatch,
  deleteItem,
  logout,
  addNotification,
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
    dispatch(addNotification({notification:"Removed from cart",variant:"warning",lifeSpan:3000}))
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      if (onHide !== null) {
        onHide();
      }
    }
    dispatch(addNotification({notification:"Error While Removing",variant:"danger",lifeSpan:3000}))
  }
};

export const changeItemAmount = async (
  cartItemId,
  amount,
  user,
  dispatch,
  addNotification,
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
    dispatch(addNotification({notification:"Amount Updated",variant:"success",lifeSpan:3000}))
  } catch (error) {
    dispatch(addNotification({notification:"Error While Updating",variant:"danger",lifeSpan:3000}))
  }
};

