import axios, {AxiosInstance, AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig} from 'axios';
import {HttpInterceptor, HTTP_INTERCEPTOR_TOKEN} from './HttpInterceptor';
import {Inject, Injectable} from 'react.di';

export interface RequestOptions<IT> extends AxiosRequestConfig {
  interceptOptions?: IT;
}

export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

@Injectable
export class Http implements AxiosInstance {

  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };

  request: (<T, IT = {}>(config: RequestOptions<IT>) => AxiosPromise<T>);
  post: (<T, IT = {}>(url: string, data?: any, config?: RequestOptions<IT>) => AxiosPromise<T>);
  put: (<T, IT = {}>(url: string, data?: any, config?: RequestOptions<IT>) => AxiosPromise<T>);
  patch: (<T, IT = {}>(url: string, data?: any, config?: RequestOptions<IT>) => AxiosPromise<T>);
  get: (<T, IT = {}>(url: string, config?: RequestOptions<IT>) => AxiosPromise<T>);
  head: <IT = {}>(url: string, config?: RequestOptions<IT>) => AxiosPromise;
  delete: <IT = {}>(url: string, config?: RequestOptions<IT>) => AxiosPromise;

  constructor(@Inject(HTTP_INTERCEPTOR_TOKEN) interceptors: HttpInterceptor[]) {
    const http = axios.create({responseType: 'json'});
    initInterceptors(interceptors, http);

    return http;
  }
}

function initInterceptors(interceptors: HttpInterceptor[], http: AxiosInstance) {
  interceptors.forEach((interceptor) => {
    Object.keys(http.interceptors).forEach(key => {
      const errorKey = `${key}Error`;
      if (interceptor[key]) {
        http.interceptors[key].use(value => {
          if (!value.interceptOptions) {
            value.interceptOptions = {};
          }
          return interceptor[key](value);
        });
      }
      if (interceptor[errorKey]) {
        http.interceptors[key].use(_ => _, err => interceptor[errorKey](err));
      }
    });
  });
}
