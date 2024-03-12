import { VITE_API_ENDPOINT } from '~/config/env.config.ts';
import { SocketConfig } from '~/services/socket.service.ts';

export const socketConfig: SocketConfig = {
  serverDomain: VITE_API_ENDPOINT,
  options: {}
};
