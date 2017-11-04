import {HttpRequestInterceptor} from '../http/HttpRequestInterceptor';
import {AxiosRequestConfig} from 'axios';
import {RequestOptions} from '../http/Http';
import {Injectable} from '../../injector';
import {AuthService} from './AuthService';
import {inject} from 'inversify';
import {HISTORY_TOKEN, History} from "../common/history";

export interface AuthInterceptorOptions {
  skipAuth?: boolean;
}

@Injectable
export class AuthInterceptor implements HttpRequestInterceptor<AuthInterceptorOptions> {

  constructor(@inject(AuthService) private authService: AuthService,
              @inject(HISTORY_TOKEN) private history: History) {
  }

  request(config: RequestOptions<AuthInterceptorOptions>): Promise<AxiosRequestConfig> | AxiosRequestConfig {

    if (!config.interceptOptions.skipAuth) {
      const token = this.authService.getValidToken();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        this.history.replace('/login');
      }
    }
    return config;
  }
}
