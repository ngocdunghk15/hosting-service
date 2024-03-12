import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { socketConfig } from '~/config/socket.config.ts';
import StorageService from '~/services/storage.service.ts';
import { Token } from '~/enum/app.enum.ts';

export interface SocketConfig {
  serverDomain: string;
  options?: Partial<ManagerOptions & SocketOptions>;
}

class SocketService {
  public socket: Socket;

  constructor(config: SocketConfig) {
    const accessToken = StorageService.get(Token.ACCESS, '');
    this.socket = io(config?.serverDomain, {
      ...config?.options,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}

export const socketService = new SocketService(socketConfig);
