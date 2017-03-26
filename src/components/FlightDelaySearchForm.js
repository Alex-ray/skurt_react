// Libraries
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import FlightDesignator from 'flight-designator';

export class FlightDelaySearchForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      valid: true,
      touched: false,
      searchValue: '',
      airlineCode: '',
      flightNumber: ''
    };
  }

  _onChange (event) {
    let val = event.target.value;
    let isValid = FlightDesignator.isValid(val);

    let newState = {
      touched: true,
      valid: isValid,
      searchValue: val
    };

    if (isValid) {
      let designatorInfo = FlightDesignator.parse(val);

      newState.airlineCode  =  designatorInfo.airlineCode;
      newState.flightNumber = designatorInfo.flightNumber;
    }

    this.setState(newState);
  }

  _onSubmit (event) {
    event.stopPropagation();
    event.preventDefault();

    const {
      props: {
        onSubmit
      },
      state: {
        searchValue,
        valid,
        airlineCode,
        flightNumber
      }
    } = this;

    if (onSubmit && valid) {
      onSubmit(searchValue, airlineCode, flightNumber);
    }
  }

  render () {
    const {
      _onChange,
      _onSubmit,
      state: {
        searchValue,
        valid,
        touched
      }
    } = this;

    let errors = (!touched || valid) ? null: (
      <ol className='list-unstyled col-sm-6 col-sm-offset-3'>
        <li className="alert alert-danger" role="alert">
          <span className="sr-only">Error:</span>
          Must be a valid flight in the format of (Airline code) KLM (Flight Number) 645.
        </li>
      </ol>
    );

    return (
      <form role="form" onSubmit={_onSubmit.bind(this)}>
        {errors}
        <div className={classNames("row form-group", {"has-error": (touched && !valid)})}>
          <div className='col-sm-6 col-sm-offset-3'>
            <input type="text"
                   className="form-control active"
                   placeholder="Search Flight"
                   onChange={_onChange.bind(this)} />
          </div>
        </div>

        <div className='row text-center flight-delay-search-form-action-group'>
          <button type="submit" className={classNames("btn btn-default", {'btn-danger': !valid})} disabled={!valid}>Search</button>
        </div>
      </form>
    );
  }
}
