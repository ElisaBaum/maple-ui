import {Inject, Injectable} from 'react.di';
import {JWTService} from '../common/JWTService';

@Injectable
export class AuthService {

  private token: string;

  constructor(@Inject private jwtService: JWTService) {
  }

  setToken(token: string) {
    this.token = token;
  }

  getValidToken(): string | undefined {
    if (this.hasValidToken()) return this.token;
  }

  private hasValidToken(): boolean {
    return !!this.token && !this.jwtService.isExpired(this.token);
  }
}
