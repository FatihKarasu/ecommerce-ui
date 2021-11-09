import axios from "axios";
import { API } from "../data/base";

export async function getProducts(query) {
  const response = await axios.get(`${API}/products` + query);
  return response.data;
}

export async function getProductById(productId) {
    const response = await axios.get(`${API}/products/` + productId);
  
    return response.data;
  }