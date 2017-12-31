import {Inject, Injectable} from 'react.di';
import {Http} from '../http/Http';
import {CSRFTokenHttpInterceptorOptions} from './CSRFTokenHttpInterceptor';

@Injectable
export class UserAuthHttpService {

  constructor(@Inject private http: Http) {
  }

  login(name: string, code: string) {
    return this.http.post<{ csrfToken: string; user: any }, CSRFTokenHttpInterceptorOptions>(
      `/login`,
      {},
      {
        headers: {
          Authorization: `Basic ${btoa(`${name}:${code}`)}`
        },
        withCredentials: true,
        interceptOptions: {skipAuth: true}
      }
    );
  }

}
