import * as React from 'react';
import {Component} from 'react';
import {Inject, Module} from 'react.di';
import {Switch, Route, Router, Redirect} from 'react-router';
import {HISTORY_TOKEN} from './common/history';
import {AuthService} from './auth/AuthService';
import {centered} from './layout/decorators/center/center';
import {LoginContainer} from './login/LoginContainer';
import {APPROVAL_PATH, Skeleton} from './skeleton/Skeleton';
import {Toast} from './layout/components/toast/Toast';
import {OverlayContainer} from './layout/components/overlay/OverlayContainer';
import {AuthModule} from './auth/AuthModule';
import {CommonModule} from './common/CommonModule';
import {HttpModule} from './http/HttpModule';
import {DynamicContentModule} from './dynamic-content/DynamicContentModule';
import {UserModule} from './user/UserModule';
import {NavigationModule} from "./layout/components/navigation/NavigationModule";
import {GalleryModule} from './gallery/GalleryModule';
import './App.scss';

export const LOGIN_PATH = '/login';
export const ROOT_PATH = '/';

const CenteredLoginContainer = centered(LoginContainer);

@Module({
  imports: [
    AuthModule,
    CommonModule,
    GalleryModule,
    HttpModule,
    DynamicContentModule,
    NavigationModule,
    UserModule,
  ]
})
export class App extends Component {
  @Inject(HISTORY_TOKEN) history: History;
  @Inject authService: AuthService;

  render() {
    return (
      <div className={'app'}>
        <Router history={this.history}>
          <Switch>
            <Route path={LOGIN_PATH} component={CenteredLoginContainer}/>
            <Route path={ROOT_PATH} exact render={() => {
              if (this.authService.isLoggedIn()) {
                return <Redirect to={APPROVAL_PATH}/>;
              }
              return <Redirect to={LOGIN_PATH}/>;
            }}/>
            <Route render={() => <Skeleton/>} />
          </Switch>
        </Router>
        <Toast/>
        <OverlayContainer/>
      </div>
    );
  }
}

