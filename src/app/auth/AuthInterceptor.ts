import {HttpRequestInterceptor} from '../http/HttpRequestInterceptor';
import {AxiosRequestConfig} from 'axios';

export class AuthInterceptor implements HttpRequestInterceptor {

  request(config: AxiosRequestConfig): Promise<AxiosRequestConfig> | AxiosRequestConfig {

  }
}
