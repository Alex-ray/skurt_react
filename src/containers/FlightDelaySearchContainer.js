// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import {FlightDelaySearchForm} from './../components/FlightDelaySearchForm.js';
import {LoadingModal} from './../components/LoadingModal.js';

// Actions
import {
  searchFlights
} from '../ducks/flights.js';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
  searchFlights: PropTypes.func.isRequired
};

class FlightDelaySearchContainer extends Component {
  render () {
    const {
      loading,
      serverError,
      searchFlights
    } = this.props;

    return (
      <div>
        <FlightDelaySearchForm onSubmit={searchFlights} serverError={serverError} />
        <LoadingModal loading={loading}/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    loading: state.getIn(['flights', 'searching']),
    serverError: state.getIn(['flights', 'error'])
  };
}

function mapDispatchToProps (dispatch) {
  return {
    searchFlights: searchFlights(dispatch)
  };
}

FlightDelaySearchContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(FlightDelaySearchContainer);
