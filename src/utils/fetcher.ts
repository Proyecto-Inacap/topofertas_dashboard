import { API } from '@/config';
import axios from 'axios';
export const fetcher = async (url: string) => axios.get(url, {
  baseURL: API.TOPOFERTAS,
}).then((res) => res.data);