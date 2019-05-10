import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import App from './App';
import Dashboard from './Dashboard';

const Routes = () => (
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );

export default Routes;
