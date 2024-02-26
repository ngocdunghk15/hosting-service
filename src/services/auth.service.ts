import { DoLoginPayload, DoLoginReturned, DoRegisterPayload } from '~/types/auth.type';
import { httpService } from '~/services/http.service';
import { store } from '~/redux/store';
import { doLogout } from '~/redux/slice/auth.slice';
import { doRevoke } from '~/redux/slice/gitlab.slice';

class AuthService {
  public login = async (payload: DoLoginPayload) => {
    return await httpService.post<DoLoginPayload, DoLoginReturned>('/auth/login', payload, { isPublicApi: true });
  };

  public register = async (payload: DoRegisterPayload) => {
    return await httpService.post<DoRegisterPayload, unknown>('/auth/register', payload, { isPublicApi: true });
  };

  public logout = async () => {
    store.dispatch(doLogout());
    store.dispatch(doRevoke());
  };
}

export const authService = new AuthService();
