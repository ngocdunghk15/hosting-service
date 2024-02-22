import {
  AxiosHeaders,
  AxiosRequestConfig,
  HeadersDefaults,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders
} from 'axios';

export interface CreateAxiosConfigs<D = any> extends Omit<AxiosRequestConfig<D>, 'headers'> {
  headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
}

export interface HttpInternalRequestConfig extends InternalAxiosRequestConfig {
  isPublicApi?: boolean;
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  isPublicApi?: boolean;
}

export type Queries = Record<string, string | number | boolean>;
