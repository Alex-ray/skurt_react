import {fromJS} from 'immutable';
import qs       from 'qs';
import $ from 'jQuery';
import { push } from 'react-router-redux';
import moment from 'moment';

const initialState = fromJS({
  directory: {},
  searching: false,
  error: ''
});

export const FLIGHTS_SEARCHING          = 'FLIGHTS_SEARCHING';
export const FLIGHTS_SET_FLIGHT_TRACK   = 'FLIGHTS_SET_FLIGHT_TRACK';
export const FLIGHTS_ERROR              = 'FLIGHTS_ERROR';

export const reducer = function (state = initialState, action = { }) {

  switch(action.type) {
    case FLIGHTS_ERROR:
      return state.merge({
        error: action.error
      });
    case FLIGHTS_SET_FLIGHT_TRACK:
      let currentDirectory = state.get('directory').toJS();
      currentDirectory[action.flightId] = action.flight;
      return state.merge({
        searching: false,
        directory: currentDirectory
      });
    case FLIGHTS_SEARCHING:
      return state.merge({
        error: '',
        searching: true
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
      if (response.flightTracks.length === 0 ) {
        flightError(dispatch)(`Could not find flight number ${response.request.airline.requestedCode} ${response.request.flight.requested}`);
        dispatch(push('/'));
        return false;
      }

      const airlineCode  = response.request.airline.fsCode;
      const flightNumber = response.request.flight.interpreted;

      const year  = response.request.date.year;
      const month = response.request.date.month;
      const day   = response.request.date.day;

      let localDate = response.flightTracks[response.flightTracks.length-1].departureDate.dateLocal;

      let flightDate = moment(localDate);
      let now        = moment();
      let diff = now.diff(flightDate, 'hours');

      if (Math.abs(diff) >= 24) {
        flightError(dispatch)('Flight must be within 24 hours of now.');
        dispatch(push('/'));
        return false;
      }

      const flightId = `${year}-${month}-${day}-${airlineCode}-${flightNumber}`;

      dispatch({
        type: FLIGHTS_SET_FLIGHT_TRACK,
        flightId: flightId,
        flight: response
      });

      dispatch(push(`/status/${flightId}`));
    }, (error) => {
      flightError(dispatch)('Ooops something went wrong!');
    });
  };
}

export function flightError(dispatch) {
  return (errorMessage) => {
    dispatch({
      type: FLIGHTS_ERROR,
      error: errorMessage
    });
  }
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
