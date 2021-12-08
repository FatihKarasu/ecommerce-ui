import axios from "axios";
import { API } from "../data/base";

export async function getReviews(productId, start, end, orderBy) {
  const response = await axios.get(
    `${API}/review?productId=${productId}&start=${start}&end=${end}&orderBy=${orderBy}`
  );
  return response.data;
}
