import {fromJS} from 'immutable';
import qs       from 'qs';
import $ from 'jQuery';

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

      console.log(action);

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

function _fetchFlights (carrier, number, successCallback, errorCallback) {
  let d = new Date();

  let day   = d.getDate();
  let month = d.getMonth()+1;
  let year  = d.getFullYear();

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
    _fetchFlights(airlineCode, flightNumber, (response) => {

      let airlineCode  = response.request.airline.fsCode;
      let flightNumber = response.request.flight.interpreted;

      let year  = response.request.date.year;
      let month = response.request.date.month;
      let day   = response.request.date.day;

      dispatch({
        type: FLIGHTS_SET_FLIGHT_TRACK,
        flightId: `${year}-${month}-${day}-${airlineCode}${flightNumber}`,
        flight: response
      });
    }, (error) => {
      console.log('TODO: handleerror');
    });
  };
}
