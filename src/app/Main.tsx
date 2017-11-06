import * as React from 'react';
import {Switch, Router, Route, Redirect} from 'react-router-dom';
import {Skeleton} from "./skeleton/Skeleton";
import {center} from './layout/decorators/center/center';
import {LoginContainer} from './login/LoginContainer';
import {Component} from 'react';
import {AuthService} from './auth/AuthService';
import {HISTORY_TOKEN, History} from './common/history';
import {Toast} from "./layout/components/toast/Toast";
import {Inject} from 'react.di';
import './App.scss';

export class Main extends Component {

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
