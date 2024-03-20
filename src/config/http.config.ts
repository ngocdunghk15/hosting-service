import { CreateAxiosConfigs } from '~/types/http.type.ts';
import { VITE_API_ENDPOINT } from '~/config/env.config.ts';

console.log({VITE_API_ENDPOINT});

export const axiosConfigs: CreateAxiosConfigs = {
  baseURL: VITE_API_ENDPOINT,
  timeout: 15000
};
