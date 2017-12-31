import {HttpRequestInterceptor} from '../http/HttpRequestInterceptor';
import {AxiosRequestConfig} from 'axios';
import {RequestOptions} from '../http/Http';
import {AuthService, CSRF_TOKEN_HEADER_KEY} from './AuthService';
import {HISTORY_TOKEN, History} from "../common/history";
import {Inject, Injectable} from 'react.di';

export interface CSRFTokenHttpInterceptorOptions {
  skipAuth?: boolean;
}

@Injectable
export class CSRFTokenHttpInterceptor implements HttpRequestInterceptor<CSRFTokenHttpInterceptorOptions> {

  constructor(@Inject private authService: AuthService,
              @Inject(HISTORY_TOKEN) private history: History) {
  }

  request(config: RequestOptions<CSRFTokenHttpInterceptorOptions>): Promise<AxiosRequestConfig> | AxiosRequestConfig {

    if (!config.interceptOptions.skipAuth) {
      const token = this.authService.getCSRFToken();

      if (token) {
        config.headers[CSRF_TOKEN_HEADER_KEY] = token;
        config.withCredentials = true;
      } else {
        this.history.replace('/login');
        throw new Error('No CSRF token');
      }
    }
    return config;
  }
}
