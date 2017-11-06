import {HttpRequestInterceptor} from '../http/HttpRequestInterceptor';
import {AxiosRequestConfig} from 'axios';
import {RequestOptions} from '../http/Http';
import {Injectable} from 'react.di';

export interface APIInterceptorOptions {
  omitAPIUrl?: boolean;
}

@Injectable
export class APIInterceptor implements HttpRequestInterceptor<APIInterceptorOptions> {

  request(config: RequestOptions<APIInterceptorOptions>): Promise<AxiosRequestConfig> | AxiosRequestConfig {

    if (!config.interceptOptions.omitAPIUrl) {
      config.baseURL = process.env.API_URL;
    }
    return config;
  }
}
