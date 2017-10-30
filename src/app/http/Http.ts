import axios, {AxiosInstance, AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {multiInject} from 'inversify';
import {HttpInterceptor} from './HttpInterceptor';

export const INTERCEPTOR_TOKEN = 'http-interceptor';

export class Http implements AxiosInstance {

  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request: <T>(config: AxiosRequestConfig) => AxiosPromise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<T>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<T>;
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<T>;
  get: <T>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  head: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
  delete: (url: string, config?: AxiosRequestConfig) => AxiosPromise;

  constructor(@multiInject(INTERCEPTOR_TOKEN) interceptors: HttpInterceptor[]) {
    const http = axios.create();

    interceptors.forEach((interceptor) => {
      Object.keys(http.interceptors).forEach(key => {
        if (interceptor[key]) {
          http.interceptors[key].use(value => interceptor[key](value));
        }
      });
    });

    return http;
  }

}
