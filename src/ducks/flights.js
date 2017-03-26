import {fromJS} from 'immutable';
import qs       from 'qs';
import $ from 'jQuery';
import { push } from 'react-router-redux';

const initialState = fromJS({
  directory: {},
  searching: false
});

export const FLIGHTS_SEARCHING          = 'FLIGHTS_SEARCHING';
export const FLIGHTS_SEARCHING_FINISHED = 'FLIGHTS_SEARCHING_FINISHED';
export const FLIGHTS_SET_FLIGHT_TRACK   = 'FLIGHTS_SET_FLIGHT_TRACK';

export const reducer = function (state = initialState, action = { }) {

  switch(action.type) {
    case FLIGHTS_SET_FLIGHT_TRACK:
      let currentDirectory = state.get('directory').toJS();
      currentDirectory[action.flightId] = action.flight;

      return state.merge({
        searching: false,
        directory: currentDirectory
      });
    case FLIGHTS_SEARCHING:
      return state.merge({
        searching: true
      });
    case FLIGHTS_SEARCHING_FINISHED:
      return state.merge({
        searching: false
      });
    default:
      return state;
  }
}

function _fetchFlights (
  carrier,
  number,
  day,
  month,
  year,
  successCallback,
  errorCallback ) {

  const flightStats = window.env.default.flightStats;

  let url = `https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/tracks/${carrier}/${number}/arr/${year}/${month}/${day}`;

  let params = {
    appId: flightStats.appId,
    appKey: flightStats.appKey,
    utc: false,
    includeFlightPlan: false,
    maxPositions: 2
  };

  let requestOptions = {
    method: 'GET',
    mode: 'cors',
    data: params
  };

  return $.ajax({
      url: url,
      jsonp: "callback",
      dataType: "jsonp",
      data: params,
      success: successCallback,
      error: errorCallback
  });

}

export function searchFlights (dispatch) {
  return (searchValue, airlineCode, flightNumber) => {
    dispatch({type: FLIGHTS_SEARCHING});

    let d = new Date();

    let day   = d.getDate();
    let month = d.getMonth()+1;
    let year  = d.getFullYear();

    fetchFlight(dispatch)(year, month, day, airlineCode, flightNumber)
  };
}

export function fetchFlight (dispatch) {
  return (year, month, day, airlineCode, flightNumber) => {
    _fetchFlights(airlineCode, flightNumber, day, month, year, (response) => {

      const airlineCode  = response.request.airline.fsCode;
      const flightNumber = response.request.flight.interpreted;

      const year  = response.request.date.year;
      const month = response.request.date.month;
      const day   = response.request.date.day;

      const flightId = `${year}-${month}-${day}-${airlineCode}-${flightNumber}`;

      dispatch({
        type: FLIGHTS_SET_FLIGHT_TRACK,
        flightId: flightId,
        flight: response
      });

      dispatch(push(`/status/${flightId}`));
    }, (error) => {
      console.log('TODO: handleerror');
    });
  };
}

export function fetchFlightById (dispatch) {
  return (flightId) => {
    let flightData = flightId.split('-');

    let year = flightData[0];
    let month = flightData[1];
    let day = flightData[2];
    let airlineCode = flightData[3];
    let flightNumber = flightData[4];

    fetchFlight(dispatch)(year, month, day, airlineCode, flightNumber);
  };
}
