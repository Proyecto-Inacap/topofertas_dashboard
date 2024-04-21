import { API } from "@/config";
import axios from "axios";

const BASE_URL_ROUTE = API.TOPOFERTAS + "comments";

export const commentApi = {
    ban : async (id: string) => {
        const response = await axios.delete(`${BASE_URL_ROUTE}/ban/${id}`);
        
        return response;
    }
}