import { JWT_SECRET } from '~/config/env.config';
import sign from 'jwt-encode';
import { jwtDecode } from 'jwt-decode';

class JwtService {
  public encode = (payload: any) => {
    return sign(typeof payload === 'string' ? { sub: payload } : payload, JWT_SECRET, {
      algorithm: 'HS256'
    });
  };

  public decode = (payload: string) => {
    return jwtDecode(payload);
  };
}

export const jwtService = new JwtService();