import { API } from "@/config";
import { User } from '@/core/users/types';
import axios from "axios";

export const authenticate = async (email: string, password: string) => {
    const res = await axios.post('/users/authenticate', { email, password },{
        baseURL: API.TOPOFERTAS
    })
    if (res.status === 200) {
        return { 
            user: res.data as User,
        }
    } else {
        return null;
    }
}