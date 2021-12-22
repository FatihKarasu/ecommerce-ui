import axios from "axios";
import { API } from "../data/base";

export async function getReviews(productId, start, end, orderBy) {
  const response = await axios.get(
    `${API}/review?productId=${productId}&start=${start}&end=${end}&orderBy=${orderBy}`
  );
  return response.data;
}
export async function getReview(user, productId) {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.get(
      `${API}/review/${user.id}/${productId}`,
      config
    );
    return response.data;
  } catch (error) {
    return false;
  }
}
export async function AddReview(
  user,
  productId,
  review,
  rating,
  dispatch,
  logout,
  router
) {
  const formData = new FormData();
  formData.append("ProductId", productId);
  formData.append("UserId", user.id);
  formData.append("ReviewText", review);
  formData.append("Rating", rating);

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.post(`${API}/review`, formData, config);
    return true;
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    return false;
  }
}

export async function UpdateReview(user, review, dispatch, logout, router) {
  const formData = new FormData();
  formData.append("ReviewId", review.reviewId);

  formData.append("ReviewText", review.reviewText);
  formData.append("Rating", review.rating);

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.post(`${API}/review/update`, formData, config);
    return true;
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    return false;
  }
}

export async function DeleteReview(user, reviewId, dispatch, logout, router) {
  const formData = new FormData();
  formData.append("ReviewId", reviewId);

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  try {
    const response = await axios.post(
      `${API}/review/delete/${reviewId}`,
      null,
      config
    );
    return true;
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(logout());
      router.push("/");
    }
    return false;
  }
}
