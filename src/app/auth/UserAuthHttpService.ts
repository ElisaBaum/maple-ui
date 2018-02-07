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
          Authorization: `Basic ${this.toBase64(`${name}:${code}`)}`
        },
        withCredentials: true,
        interceptOptions: {skipAuth: true}
      }
    );
  }

  private toBase64(value: string) {
    return btoa(
      encodeURIComponent(value).replace(
        /%([0-9A-F]{2})/g,
        (match, p1) => String.fromCharCode(('0x' + p1) as any)
      )
    );
  }

}
