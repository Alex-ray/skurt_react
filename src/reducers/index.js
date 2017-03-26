// Libraries
import {combineReducers} from 'redux-immutable';

// Reducers
import {reducer as flightReducer} from '../ducks/flights.js';

const reducers = {
  flights: flightReducer
};


export default combineReducers(reducers);
