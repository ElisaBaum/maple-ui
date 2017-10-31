import * as React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import {Skeleton} from "./skeleton/Skeleton";
import {center} from './layout/decorators/center/center';
import {LoginContainer} from './login/LoginContainer';
import {Http} from './http/Http';
import './App.scss';
import {AuthInterceptor} from './auth/AuthInterceptor';
import {APIInterceptor} from './common/APIInterceptor';

Http.registerInterceptors([
  AuthInterceptor,
  APIInterceptor
]);

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={'/login'} render={() => center(LoginContainer)} />
      <Route path={'/'} component={Skeleton} />
    </Switch>
  </BrowserRouter>
);
