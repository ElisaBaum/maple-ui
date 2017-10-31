import {Injectable} from '../../injector';

@Injectable
export class AuthService {

  private _token: string;

  get token() {
    if (!this.hasValidToken()) {
      // TODO: redirect to login
      throw new Error('Invalid token');
    }
    return this._token;
  }
  set token(token: string) {
    this._token = token;
  }

  hasValidToken() {
    // TODO: check exp
    return !!this._token;
  }
}
