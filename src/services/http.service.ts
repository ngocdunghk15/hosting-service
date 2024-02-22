import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { store } from '~/redux/store.ts';
import { initialAuthState, setAuthState } from '~/redux/slice/auth.slice.ts';
import { axiosConfigs } from '~/config/http.config.ts';
import { CreateAxiosConfigs, HttpInternalRequestConfig, HttpRequestConfig } from '~/types/http.type.ts';

class HttpService {
  private readonly axiosService: AxiosInstance;
  private configs?: CreateAxiosConfigs;

  constructor(configs?: CreateAxiosConfigs) {
    this.axiosService = axios.create(configs);
    this.configs = configs;
    this.setUpInterceptors();
  }

  private setUpInterceptors = () => {
    this.axiosService.interceptors.request.use(this.onRequest, this.onRequestError);
    this.axiosService.interceptors.response.use(this.onResponse, this.onResponseError);
  };

  private onRequest = async (config: HttpInternalRequestConfig) => {
    const accessToken = store.getState().auth.accessToken;
    if (!config?.isPublicApi) {
      const decodedAccessToken: any = jwtDecode(accessToken);
      const isAccessTokenExpired = decodedAccessToken.exp * 1000 < new Date().getTime();
      if (isAccessTokenExpired) {
        await this.handleRefreshToken();
      }

      const updatedAccessToken = store.getState().auth.accessToken;
      Object.assign(config?.headers, {
        Authorization: `Bearer ${updatedAccessToken}`
      });
    }
    return config;
  };

  private onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  private onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  private onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  private handleRefreshToken = async () => {
    try {
      const refreshToken = store.getState()?.auth?.refreshToken;
      if (!refreshToken) {
        store.dispatch(setAuthState({ ...initialAuthState }));
        window?.location?.replace('/auth/sign-in');
      }
      const response = (await axios.post(`${this.configs?.baseURL}auth/refresh-token`, { refreshToken: refreshToken }))
        ?.data;
      store.dispatch(
        setAuthState({
          accessToken: response?.access.token,
          refreshToken: response?.refresh.token,
          account: response?.account,
          isLoggedIn: true
        })
      );
      return Promise.resolve(response);
    } catch (error) {
      window.location.href = '/auth/sign-in';
    }
  };

  public async get<ResponseDataType, Queries = NonNullable<unknown>>(
    url: string,
    queries?: Queries,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<ResponseDataType>> {
    return await this.axiosService.get(url, {
      ...config,
      params: queries
    });
  }

  public async post<Payload, ResponseDataType>(
    url: string,
    payload?: Payload,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<ResponseDataType>> {
    return await this.axiosService.post(url, payload, config);
  }

  public async patch<Payload, ResponseDataType>(
    url: string,
    payload?: Payload,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<ResponseDataType>> {
    return await this.axiosService.patch(url, payload, config);
  }

  public async delete(url: string, config?: HttpRequestConfig) {
    return await this.axiosService.delete(url, config);
  }
}

export const httpService = new HttpService(axiosConfigs);
