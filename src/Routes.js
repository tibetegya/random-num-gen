import React from 'react';
import {Helmet} from "react-helmet";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './Home';
import Dashboard from './Dashboard';

const Routes = () => (
    <Router>
      <Helmet>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
      </Helmet>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  );

export default Routes;
