import axios from "axios";
import {API} from '../data/base'

export async function getCategories(){
    const catResponse = await axios.get(`${API}/category`);
    return catResponse.data
}