import { API } from "@/config";
import axios from "axios";

const BASE_URL_ROUTE = API.TOPOFERTAS + "users";

export const userApi = {
    ban: async (id: string) => {
        const response = await axios.delete(
            `${BASE_URL_ROUTE}/ban/${id}`
        );
        return response;
    },
    create: async (data: Object) => {
        const response = await axios.post(
            `${BASE_URL_ROUTE}`,
            data
        );
        return response;
    }
}