import {Injectable} from '../../injector';

@Injectable
export class LoginService {

  login(e) {
    console.log('hey', e);
  }
}
