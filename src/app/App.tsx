import * as React from 'react';
import {AuthInterceptor} from './auth/AuthInterceptor';
import {APIInterceptor} from './common/APIInterceptor';
import {Module} from 'react.di';
import {INTERCEPTOR_TOKEN} from './http/HttpInterceptor';
import {HISTORY_TOKEN, history} from './common/history';
import {AuthService} from './auth/AuthService';
import {Main} from './Main';
import {UserHttpService} from './user/UserHttpService';
import {Http} from './http/Http';
import './App.scss';

export const App = () => (
  <Module providers={[
    AuthService,
    UserHttpService,
    Http,
    {provide: HISTORY_TOKEN, useValue: history},
    {provide: INTERCEPTOR_TOKEN, useClass: APIInterceptor},
    {provide: INTERCEPTOR_TOKEN, useClass: AuthInterceptor},
  ]}>
    <Main/>
  </Module>
);
