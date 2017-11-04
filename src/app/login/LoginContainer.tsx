import * as React from 'react';
import {Component} from 'react';
import {Login} from './Login';
import {Inject} from '../../injector';
import {UserHttpService} from '../user/UserHttpService';
import {AuthService} from '../auth/AuthService';
import {HISTORY_TOKEN, History} from '../common/history';
import {toast} from "react-toastify";

export class LoginContainer extends Component {

  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;
  @Inject userHttpService: UserHttpService;

  async handleLogin({name, code}) {
    try {
      const {data} = await this.userHttpService.getUserToken(name, code);
      this.authService.setToken(data.token);
      this.history.replace('/');
    } catch (e) {
      toast.error(<p>Fehler beim Login. Bitte erneut versuchen.</p>);
    }
  }

  render() {
    return (<Login onSubmit={e => this.handleLogin(e)}/>);
  }
}
