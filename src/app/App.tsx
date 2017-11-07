import * as React from 'react';
import {Component} from 'react';
import {Inject, Module} from 'react.di';
import {Switch, Route, Router, Redirect} from 'react-router';
import {AuthHttpInterceptor} from './auth/AuthHttpInterceptor';
import {APIHttpInterceptor} from './common/APIHttpInterceptor';
import {HTTP_INTERCEPTOR_TOKEN} from './http/HttpInterceptor';
import {HISTORY_TOKEN, history} from './common/history';
import {AuthService} from './auth/AuthService';
import {UserHttpService} from './user/UserHttpService';
import {Http} from './http/Http';
import {center} from './layout/decorators/center/center';
import {LoginContainer} from './login/LoginContainer';
import {Skeleton} from './skeleton/Skeleton';
import {Toast} from './layout/components/toast/Toast';
import './App.scss';

export const App = () => (
  <Module providers={[
    AuthService,
    UserHttpService,
    Http,
    {provide: HISTORY_TOKEN, useValue: history},
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: APIHttpInterceptor},
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: AuthHttpInterceptor},
  ]}>
    <Content/>
  </Module>
);

class Content extends Component {
  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;

  render() {
    return (
      <div className={'root-container'}>
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
        <Toast/>
      </div>
    );
  }
}
