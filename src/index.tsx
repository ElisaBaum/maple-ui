import * as React from 'react';
import {render} from 'react-dom';
import {App} from "./app/App";
import * as promises from "es6-promise";
import './index.scss';

promises.polyfill();

render(
  <App />,
  document.getElementById('root')
);
