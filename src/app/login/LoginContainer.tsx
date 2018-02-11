import * as React from 'react';
import {Component} from 'react';
import {Login} from './Login';
import {UserHttpService} from '../user/UserHttpService';
import {AuthService} from '../auth/AuthService';
import {HISTORY_TOKEN, History} from '../common/history';
import {toast} from "react-toastify";
import {Inject} from 'react.di';
import {UserAuthHttpService} from '../auth/UserAuthHttpService';
import {LOGIN_PATH, ROOT_PATH} from '../App';
import {UserService} from '../user/UserService';

interface LoginContainerState {
  loading: boolean;
}

export class LoginContainer extends Component<{}, LoginContainerState> {

  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;
  @Inject userService: UserService;
  @Inject userHttpService: UserHttpService;
  @Inject userAuthHttpService: UserAuthHttpService;

  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  async handleLogin({name, code}) {
    this.setState({loading: true});
    try {
      const {data: {csrfToken, user}} = await this.userAuthHttpService.login(name, code);
      await this.authService.setCSRFToken(csrfToken);
      await this.userService.setUser(user);
      toast.dismiss();
      const prevPath = this.history.getPrevPath();
      const nextPath = (prevPath && prevPath !== LOGIN_PATH) ? prevPath : ROOT_PATH;
      this.history.replace(nextPath);
    } catch (e) {
      this.setState({loading: false});
      toast.error(<p>Fehler beim Login. Bitte versuche es erneut.</p>);
    }
  }

  render() {
    return (<Login onSubmit={e => this.handleLogin(e)} loading={this.state.loading}/>);
  }
}
