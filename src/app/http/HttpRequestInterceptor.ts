import {AxiosRequestConfig} from 'axios';
import {RequestOptions} from './Http';

export interface HttpRequestInterceptor<IT = {}> {

  request(config: RequestOptions<IT>): Promise<AxiosRequestConfig> | AxiosRequestConfig;
}
