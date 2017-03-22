import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import Dashboard from './views/Dashboard';

ReactDOM.render(
  <Router>
    <Route path='/' component={Dashboard}/>
  </Router>
  , document.getElementById('content')
);
