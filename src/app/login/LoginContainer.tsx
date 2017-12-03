import * as React from 'react';
import {Component} from 'react';
import {Login} from './Login';
import {UserHttpService} from '../user/UserHttpService';
import {AuthService} from '../auth/AuthService';
import {HISTORY_TOKEN, History} from '../common/history';
import {toast} from "react-toastify";
import {Inject} from 'react.di';

interface LoginContainerState {
  loading: boolean;
}

export class LoginContainer extends Component<{}, LoginContainerState> {

  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;
  @Inject userHttpService: UserHttpService;

  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  async handleLogin({name, code}) {
    this.setState({loading: true});
    try {
      const {data} = await this.userHttpService.getUserToken(name, code);
      this.authService.setToken(data.token);
      toast.dismiss();
      this.history.replace('/approval');
    } catch (e) {
      this.setState({loading: false});
      toast.error(<p>Fehler beim Login. Bitte erneut versuchen.</p>);
    }
  }

  render() {
    return (<Login onSubmit={e => this.handleLogin(e)} loading={this.state.loading}/>);
  }
}
