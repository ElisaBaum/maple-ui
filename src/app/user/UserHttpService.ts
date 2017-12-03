import {Http} from '../http/Http';
import {AuthInterceptorOptions} from '../auth/AuthHttpInterceptor';
import {Inject, Injectable} from 'react.di';
import {User} from "./User";

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

  updateUser(accepted: boolean) {
    return this.http.patch('/users/me', {accepted});
  }

  async getPartyUsers() {
    const companions = await this.http.get<{users: User[]}>('/users/me/party');
    return companions.data.users;
  }

  addCompanion(name: string) {
    return this.http.post('/users/me/users', {name});
  }

  updateCompanionApproval(accepted: boolean) {
    return this.http.patch('/users/me/users/:companionId', {accepted});
  }

}
