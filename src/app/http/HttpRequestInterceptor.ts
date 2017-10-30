import {AxiosRequestConfig} from 'axios';

export interface HttpRequestInterceptor {

  request(config: AxiosRequestConfig): Promise<AxiosRequestConfig> | AxiosRequestConfig;
}
