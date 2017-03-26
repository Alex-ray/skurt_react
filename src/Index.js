// Libraries
import 'babel-polyfill';
import {
  createStore,
  applyMiddleware
} from 'redux';
import {combineReducers} from 'redux-immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Route} from 'react-router-dom';
import {
  ConnectedRouter,
  routerMiddleware
} from 'react-router-redux';

// Views
import Dashboard from './views/Dashboard.js';
import FlightStatus from './views/FlightStatus.js';

// Reducers
import reducers from './reducers/index.js';

const history = createHistory();
const middleware = routerMiddleware(history);

let store = createStore(combineReducers(reducers), applyMiddleware(middleware));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/status/:flightId' component={FlightStatus} />
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('content')
);
