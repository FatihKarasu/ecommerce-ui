import axios from "axios";
import {API} from '../data/base'

export async function getFilters(){
    const response = await axios.get(`${API}/filter`);
    return response.data
}

export async function getCategories(){
    const response = await axios.get(`${API}/category/forfilter`);
    return response.data
}