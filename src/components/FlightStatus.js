import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import moment from 'moment';

const propTypes = {
  delay: PropTypes.number,
  departing: PropTypes.string,
  arriving: PropTypes.string,
  carrier: PropTypes.string,
  flightNumber: PropTypes.string,
  departureDate: PropTypes.object
};

const defaultProps = {
  departureDate: {
    dateLocal: new Date()
  }
};

class FlightStatus extends Component {
  render () {
    const {
      delay,
      departing,
      arriving,
      carrier,
      flightNumber,
      departureDate
    } = this.props;

    let textStatus = delay > 0 ? `Delayed (${delay} minutes)`: 'On Time';

    return (
      <div className={classNames('panel panel-success', {'panel-danger': delay > 0})}>
        <h1 className='panel-title panel-heading'>Flight Status : {textStatus}</h1>
        <div className='panel-body'>
          <p>
              Flight {carrier} {flightNumber}<br/>
              From: {departing} to {arriving}<br/>

              Departure Date: {moment(departureDate.dateLocal).format('MM/DD')}<br/>
              Departure Time: {moment(departureDate.dateLocal).format('hh:mm a')}<br/>

              Delay: {delay || 0} Minutes
          </p>
        </div>
      </div>
    )
  }
}

FlightStatus.propTypes = propTypes;
FlightStatus.defaultProps = defaultProps;

export {FlightStatus};
