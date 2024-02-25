import { DoLoginPayload, DoLoginReturned, DoRegisterPayload } from '~/types/auth.type';
import { httpService } from '~/services/http.service';

class AuthService {
  public login = async (payload: DoLoginPayload) => {
    return await httpService.post<DoLoginPayload, DoLoginReturned>('/auth/login', payload, { isPublicApi: true });
  };

  public register = async (payload: DoRegisterPayload) => {
    return await httpService.post<DoRegisterPayload, unknown>('/auth/register', payload, { isPublicApi: true });
  };
}

export const authService = new AuthService();
