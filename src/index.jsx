import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import App from './App';
import Dashboard from './Dashboard';

ReactDOM.render(
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>,
  document.getElementById('root'),
);
