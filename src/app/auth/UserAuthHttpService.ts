import {Inject, Injectable} from 'react.di';
import {Http} from '../http/Http';
import {CSRFTokenHttpInterceptorOptions} from './CSRFTokenHttpInterceptor';
import {toBase64} from '../utils/crypto';

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
          Authorization: `Basic ${toBase64(`${name}:${code}`)}`
        },
        withCredentials: true,
        interceptOptions: {skipAuth: true}
      }
    );
  }

}
