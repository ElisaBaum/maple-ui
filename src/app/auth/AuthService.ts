import {Inject, Injectable} from 'react.di';
import {StorageService} from '../common/StorageService';

const CSRF_TOKEN_KEY = 'csrfToken';
export const CSRF_TOKEN_HEADER_KEY = 'x-csrf-token';

@Injectable
export class AuthService {

  constructor(@Inject private storageService: StorageService) {
  }

  setCSRFToken(csrfToken: string) {
    this.storageService.set(CSRF_TOKEN_KEY, csrfToken);
  }

  isLoggedIn() {
    return this.storageService.has(CSRF_TOKEN_KEY);
  }

  getCSRFToken() {
    return this.storageService.get<string>(CSRF_TOKEN_KEY);
  }
}
