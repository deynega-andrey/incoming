import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import {BrowserRouter, Switch} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>, document.getElementById(`root`));
