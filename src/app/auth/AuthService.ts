import {Injectable} from 'react.di';

@Injectable
export class AuthService {

  private token: string;

  setToken(token: string) {
    this.token = token;
  }

  getValidToken(): string | undefined {
    if (this.hasValidToken()) return this.token;
  }

  private hasValidToken(): boolean {
    // TODO: check exp
    return !!this.token;
  }
}
