import React, {Component, PropTypes} from 'react';

export class FlightDelaySearchForm extends Component {
  render () {
    return (
      <form role="form">
        <div className="row form-group">
          <div className='col-sm-6 col-sm-offset-3'>
            <input type="text" className="form-control active" placeholder="Search Flight" />
          </div>
        </div>

        <div className='row text-center flight-delay-search-form-action-group'>
          <button type="submit" className="btn btn-default">Search</button>
        </div>
      </form>
    );
  }
}
