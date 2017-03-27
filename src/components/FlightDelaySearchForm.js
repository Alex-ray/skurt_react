// Libraries
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import FlightDesignator from 'flight-designator';

const propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func
};


class FlightDelaySearchForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      valid: true,
      touched: false,
      searchValue: '',
      airlineCode: '',
      flightNumber: '',
      error: '',
    };
  }

  _onChange (event) {
    let val = event.target.value.toUpperCase();
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
    } else {
      newState.error = 'Must be a valid flight in the format of Airline Code (KLM) Flight Number (645).';
    }

    this.setState(newState);
  }

  _onSubmit (event) {
    event.stopPropagation();
    event.preventDefault();

    const {
      _onChange,
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

    if (searchValue.length === 0) {
      _onChange.bind(this)({target: {value: ''}});
    }

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

    let errorMessage = this.state.error.length > 1 ?  this.state.error : this.props.error;

    // TODO: Abstract into its own component for future re-use with other components
    // AJR 03-27-17
    let errors = (!touched || valid) && errorMessage.length === 0 ? null: (
      <ol className='list-unstyled col-sm-6 col-sm-offset-3'>
        <li className="alert alert-danger" role="alert">
          <i className='fa fa-info-circle fa-fw'></i>
          <span className="sr-only">Error:</span>
          {errorMessage}
        </li>
      </ol>
    );

    return (
      <form role="form" onSubmit={_onSubmit.bind(this)}>
        {errors}
        <div className={classNames("row form-group", {"has-error": (touched && !valid)})}>
          <div className='col-sm-6 col-sm-offset-3'>
            <input type="text"
                   value={searchValue}
                   className="form-control active"
                   placeholder="Search Flight"
                   onChange={_onChange.bind(this)} />
          </div>
        </div>

        <div className='row text-center flight-delay-search-form-action-group'>
          <button type="submit" className={classNames("btn btn-success", {'btn-danger': !valid})} disabled={!valid}>Search</button>
        </div>
      </form>
    );
  }
}

FlightDelaySearchForm.propTypes = propTypes;

export {FlightDelaySearchForm};
