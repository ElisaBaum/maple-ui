import * as React from 'react';
import {Component} from 'react';
import {Login} from './Login';
import {Inject} from '../../injector';
import {UserHttpService} from '../user/UserHttpService';
import {AuthService} from '../auth/AuthService';

export class LoginContainer extends Component {

  @Inject authService: AuthService;
  @Inject userHttpService: UserHttpService;

  async handleLogin({name, code}) {
    try {
      const {data} = await this.userHttpService.getUserToken(name, code);
      this.authService.token = data.token;
      console.log(this.authService.token);
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    return (<Login onSubmit={e => this.handleLogin(e)}/>);
  }
}
