import axios, {AxiosInstance, AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {multiInject} from 'inversify';
import {HttpInterceptor, INTERCEPTOR_TOKEN} from './HttpInterceptor';
import {container, Injectable} from '../../injector';

export interface RequestOptions<IT> extends AxiosRequestConfig {
  interceptOptions: IT;
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

  constructor(@multiInject(INTERCEPTOR_TOKEN) interceptors: HttpInterceptor[]) {
    const http = axios.create({responseType: 'json'});
    initInterceptors(interceptors, http);

    return http;
  }

  static registerInterceptors(interceptors: any) {
    interceptors.forEach(interceptor => container.bind(INTERCEPTOR_TOKEN).to(interceptor));

  }
}

function initInterceptors(interceptors: HttpInterceptor[], http: AxiosInstance) {
  interceptors.forEach((interceptor) => {
    Object.keys(http.interceptors).forEach(key => {
      if (interceptor[key]) {
        http.interceptors[key].use(value => {
          if (!value.interceptOptions) {
            value.interceptOptions = {};
          }
          return interceptor[key](value);
        });
      }
    });
  });
}
