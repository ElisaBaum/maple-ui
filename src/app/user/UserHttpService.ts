import {Injectable} from '../../injector';
import {inject} from 'inversify';
import {Http} from '../http/Http';
import {AuthInterceptorOptions} from '../auth/AuthInterceptor';

@Injectable
export class UserHttpService {

  constructor(@inject(Http) private http: Http) {
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
