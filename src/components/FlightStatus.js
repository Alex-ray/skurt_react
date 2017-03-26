import React, {Component} from 'react';
import classNames from 'classnames';

export class FlightStatus extends Component {
  render () {
    const {
      delay,
      departing,
      arriving,
      carrier,
      flightNumber
    } = this.props;

    let textStatus = delay > 0 ? `Delayed (${delay} minutes)`: '';

    return (
      <div className={classNames('panel panel-success', {'panel-danger': delay > 0})}>
        <h1 className='panel-title panel-heading'>Flight Status : {textStatus}</h1>
        <p className='panel-body'>
          <ul>
            <li>
              {carrier} {flightNumber}
            </li>
            <li>
              {departing} - {arriving}
            </li>
            <li>
              Delay: {delay || 0} Minutes
            </li>
          </ul>
        </p>
      </div>
    )
  }
}
