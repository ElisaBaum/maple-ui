import {HttpRequestInterceptor} from '../http/HttpRequestInterceptor';
import {AxiosRequestConfig} from 'axios';
import {RequestOptions} from '../http/Http';
import {Injectable} from '../../injector';
import {AuthService} from './AuthService';
import {inject} from 'inversify';

export interface AuthInterceptorOptions {
  skipAuth?: boolean;
}

@Injectable
export class AuthInterceptor implements HttpRequestInterceptor<AuthInterceptorOptions> {

  constructor(@inject(AuthService) private authService: AuthService) {
  }

  request(config: RequestOptions<AuthInterceptorOptions>): Promise<AxiosRequestConfig> | AxiosRequestConfig {

    if (!config.interceptOptions.skipAuth) {
      config.headers['Authorization'] = `Bearer ${this.authService.token}`;
    }
    return config;
  }
}
