import * as React from 'react';
import {render} from 'react-dom';
import {App} from "./app/App";
import './index.scss';
import 'antd/dist/antd.css';

render(
  <App />,
  document.getElementById('root')
);
