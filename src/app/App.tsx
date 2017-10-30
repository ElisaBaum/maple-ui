import * as React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import {Skeleton} from "./skeleton/Skeleton";
import {center} from './layout/decorators/center/center';
import {LoginContainer} from './login/LoginContainer';
import './App.scss';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={'/login'} render={() => center(LoginContainer)} />
      <Route path={'/'} component={Skeleton} />
    </Switch>
  </BrowserRouter>
);
