import * as React from 'react';
import {Component} from 'react';
import {Inject, Module} from 'react.di';
import {Switch, Route, Router, Redirect} from 'react-router';
import {HISTORY_TOKEN} from './common/history';
import {AuthService} from './auth/AuthService';
import {center} from './layout/decorators/center/center';
import {LoginContainer} from './login/LoginContainer';
import {Skeleton} from './skeleton/Skeleton';
import {Toast} from './layout/components/toast/Toast';
import {AuthModule} from './auth/AuthModule';
import {CommonModule} from './common/CommonModule';
import {HttpModule} from './http/HttpModule';
import {DynamicContentModule} from './dynamic-content/DynamicContentModule';
import {UserModule} from './user/UserModule';
import './App.scss';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    HttpModule,
    DynamicContentModule,
    UserModule,
  ]
})
export class App extends Component {
  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;

  render() {
    return (
      <div className={'root-container'}>
        <Router history={this.history}>
          <Switch>
            <Route path={'/login'} render={() => center(LoginContainer)}/>
            <Route path={'/'} render={() => {
              if (this.authService.isLoggedIn()) {
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

