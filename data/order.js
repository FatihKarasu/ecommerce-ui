import axios from "axios";
import {API} from '../data/base'

export async function getOrdersByUserId(userId, config) {
    const response = await axios.get(`${API}/order/user/${userId}`, config);
    return response.data;
}
