import {Http} from '../http/Http';
import {AuthInterceptorOptions} from '../auth/AuthInterceptor';
import {Inject, Injectable} from 'react.di';

@Injectable
export class UserHttpService {

  constructor(@Inject private http: Http) {
  }

  getUserToken(name: string, code: string) {
    return this.http.get<{ token: string }, AuthInterceptorOptions>(
      `/users/me/token`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${name}:${code}`)}`
        },
        interceptOptions: {skipAuth: true}
      }
    );
  }

}
