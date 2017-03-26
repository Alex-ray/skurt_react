// Libraries
import 'babel-polyfill';
import {createStore} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
  Router,
  Route
} from 'react-router';

// Views
import Dashboard from './views/Dashboard.js';

// Reducers
import reducers from './reducers/index.js';

let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={Dashboard}/>
    </Router>
  </Provider>
  , document.getElementById('content')
);
