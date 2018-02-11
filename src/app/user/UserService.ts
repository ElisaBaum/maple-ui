import {Inject, Injectable} from 'react.di';
import {StorageService} from '../common/StorageService';
import {User} from './User';

const USER_KEY = 'user';

@Injectable
export class UserService {

  constructor(@Inject private storageService: StorageService) {
  }

  setUser(user: User) {
    this.storageService.set(USER_KEY, user);
  }

  getUser() {
    return this.storageService.get<User>(USER_KEY);
  }
}
