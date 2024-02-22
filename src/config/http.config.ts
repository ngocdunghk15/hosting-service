import { CreateAxiosConfigs } from '~/types/http.type.ts';
import { API_ENDPOINT } from '~/config/env.config.ts';

export const axiosConfigs: CreateAxiosConfigs = {
  baseURL: API_ENDPOINT,
  timeout: 15000
};
