// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import {FlightDelaySearchForm} from './../components/FlightDelaySearchForm.js';

// Actions
import {
  searchFlights
} from '../ducks/flights.js';

class FlightDelaySearchContainer extends Component {
  render () {
    const {
      searchFlights
    } = this.props;

    return (
      <FlightDelaySearchForm onSubmit={searchFlights} />
    );
  }
}

function mapStateToProps (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    searchFlights: searchFlights(dispatch)
  };
}

FlightDelaySearchContainer.propTypes = {
  searchFlights: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightDelaySearchContainer);
