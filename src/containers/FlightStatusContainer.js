import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import {FlightStatus} from './../components/FlightStatus.js';
import {LoadingModal} from './../components/LoadingModal.js';

// Actions
import {
  fetchFlightById
} from './../ducks/flights.js';

const propTypes = {
  flightId: PropTypes.string.isRequired,
  track: PropTypes.object.isRequired,
  flightLoaded: PropTypes.bool.isRequired,
};

class FlightStatusContainer extends Component {
  render () {
    const {
      track: {
        delayMinutes,
        arrivalAirportFsCode,
        departureAirportFsCode,
        carrierFsCode,
        flightNumber,
        departureDate
      },
      flightLoaded
    } = this.props;

    return (
      <div>
        <FlightStatus
          delay={delayMinutes}
          departing={departureAirportFsCode}
          arriving={arrivalAirportFsCode}
          carrier={carrierFsCode}
          flightNumber={flightNumber}
          departureDate={departureDate}
        />
        <LoadingModal loading={!flightLoaded} />
      </div>
    );
  }

  componentDidMount() {
    const {
      flightId,
      flightLoaded,
      fetchFlight
    } = this.props;

    if (!flightLoaded) {
      fetchFlight(flightId);
    }
  }

  componentDidUpdate() {
    const {
      flightId,
      flightLoaded,
      fetchFlight
    } = this.props;

    if (!flightLoaded) {
      fetchFlight(flightId);
    }
  }
}

function mapStateToProps (state, {flightId}) {
  const flightState = state.get('flights').toJS();
  const flight = flightState.directory[flightId];

  let flightTracks = flight ? flight.flightTracks : false;
  let lastTrack = flightTracks ? flightTracks[flightTracks.length-1] : {};

  return {
    flightId: flightId,
    track: lastTrack,
    flightLoaded: flightTracks !== false
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchFlight: fetchFlightById(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightStatusContainer);
