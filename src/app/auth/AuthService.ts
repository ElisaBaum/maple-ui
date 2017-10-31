import {Injectable} from '../../injector';

@Injectable
export class AuthService {

  private _token: string;

  get token() {
    if (!this.isTokenValid()) {
      // TODO: redirect to login
      throw new Error('Invalid token');
    }
    return this._token;
  }
  set token(token: string) {
    this._token = token;
  }

  private isTokenValid() {
    // TODO: check exp
    return !!this._token;
  }
}
