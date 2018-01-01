import {Http} from '../http/Http';
import {Inject, Injectable} from 'react.di';
import {User} from "./User";
import {Party} from "./Party";

@Injectable
export class UserHttpService {

  constructor(@Inject private http: Http) {
  }

  async getParty() {
    const companions = await this.http.get('/users/me/party');
    return companions.data as Party;
  }

  async addCompanion(partialUser: Partial<User>) {
    const addedUser = await this.http.post('/users/me/companions', partialUser);
    return addedUser.data as User;
  }

  updateCompanionPartially(partialUser: Partial<User> & { id: number }) {
    return this.http.patch(`/users/me/companions/${partialUser.id}`, {...partialUser});
  }

}
