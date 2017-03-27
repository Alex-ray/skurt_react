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
              <b>Flight:</b> {carrier} {flightNumber}<br/>
              <b>From:</b> {departing} to {arriving}<br/>

              <b>Departure Date:</b> {moment(departureDate.dateLocal).format('MM/DD')}<br/>
              <b>Scheduled Departure Time:</b> {moment(departureDate.dateLocal).format('hh:mm a')}<br/>
              <b>Delayed Departure Time:</b> {moment(departureDate.dateLocal).add(delay, 'minutes').format('hh:mm a')}<br/>

              <b>Delay:</b> {delay || 0} Minutes
          </p>
        </div>
      </div>
    )
  }
}

FlightStatus.propTypes = propTypes;
FlightStatus.defaultProps = defaultProps;

export {FlightStatus};
