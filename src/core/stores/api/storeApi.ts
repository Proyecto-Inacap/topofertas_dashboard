import { API } from "@/config";
import axios from "axios";

const BASE_URL_ROUTE = API.TOPOFERTAS + "stores";

export const storeApi = {
  update: async (id: string, data: Object) => {
    const response = await axios.patch(
      `${BASE_URL_ROUTE}/${id}`,
      data
    );
    return response;
  },
  create: async (data: Object) => {
    const response = await axios.post(`${BASE_URL_ROUTE}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};
