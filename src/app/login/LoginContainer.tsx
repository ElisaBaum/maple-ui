import * as React from 'react';
import {Component} from 'react';
import {Login} from './Login';
import {Inject} from '../../injector';
import {LoginService} from './LoginService';

export class LoginContainer extends Component {

  @Inject
  loginService: LoginService;

  render() {
    return (<Login onSubmit={e => this.loginService.login(e)} />);
  }
}
