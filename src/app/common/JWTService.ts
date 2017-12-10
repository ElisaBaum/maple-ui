import {Injectable} from 'react.di';

@Injectable
export class JWTService {

  decode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  isExpired(token: string) {
    const payload = this.decode(token);
    return new Date() > new Date(payload.exp * 1000);
  }

}
