// Libraries
import {routerReducer} from 'react-router-redux';

// Reducers
import {reducer as flightReducer} from '../ducks/flights.js';

const reducers = {
  router: routerReducer,
  flights: flightReducer
};


export default reducers;
