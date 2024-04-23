import { API } from "@/config";
import axios from "axios";

const BASE_URL_ROUTE = API.TOPOFERTAS + "coupons";

export const couponApi = {
    update: async (id: string, data: Object) => {
        const response = await axios.patch(`${BASE_URL_ROUTE}/${id}`, data);

        return response;
    }
}