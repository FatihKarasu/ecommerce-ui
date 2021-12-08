import axios from "axios";
import {API} from '../data/base'

export async function getCampaigns(){
    const response = await axios.get(`${API}/campaign`);
    return response.data
}

