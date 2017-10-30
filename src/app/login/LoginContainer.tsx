import * as React from 'react';
import {Component} from 'react';
import {Login} from './Login';

export class LoginContainer extends Component {

  render() {
    return (<Login onSubmit={e => console.log(e)} />);
  }
}
