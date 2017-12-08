import {HttpRequestInterceptor} from '../http/HttpRequestInterceptor';
import {AxiosRequestConfig} from 'axios';
import {RequestOptions} from '../http/Http';
import {AuthService} from './AuthService';
import {HISTORY_TOKEN, History} from "../common/history";
import {Inject, Injectable} from 'react.di';

export interface AuthInterceptorOptions {
  skipAuth?: boolean;
}

@Injectable
export class AuthHttpInterceptor implements HttpRequestInterceptor<AuthInterceptorOptions> {

  constructor(@Inject private authService: AuthService,
              @Inject(HISTORY_TOKEN) private history: History) {
  }

  request(config: RequestOptions<AuthInterceptorOptions>): Promise<AxiosRequestConfig> | AxiosRequestConfig {

    if (!config.interceptOptions.skipAuth) {
      const token = this.authService.getValidToken();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        this.history.replace('/login');
        throw new Error('No valid JWT');
      }
    }
    return config;
  }
}
