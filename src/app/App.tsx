import * as React from 'react';
import {Switch, Router, Route, Redirect} from 'react-router-dom';
import {Skeleton} from "./skeleton/Skeleton";
import {center} from './layout/decorators/center/center';
import {LoginContainer} from './login/LoginContainer';
import {Http} from './http/Http';
import {AuthInterceptor} from './auth/AuthInterceptor';
import {APIInterceptor} from './common/APIInterceptor';
import {Component} from 'react';
import {Inject} from '../injector';
import {AuthService} from './auth/AuthService';
import {HISTORY_TOKEN, History} from './common/history';
import './App.scss';

Http.registerInterceptors([
  AuthInterceptor,
  APIInterceptor
]);

export class App extends Component {

  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;

  render() {
    return (
      <Router history={this.history}>
        <Switch>
          <Route path={'/login'} render={() => center(LoginContainer)}/>
          <Route path={'/'} render={() => {
            if (this.authService.getValidToken()) {
              return <Skeleton/>;
            }
            return <Redirect to={'/login'}/>;
          }}/>
        </Switch>
      </Router>
    );
  }
}
