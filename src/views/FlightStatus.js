// Libraries
import React, {Component, PropTypes} from 'react';

// Containers
import FlightStatusContainer from './../containers/FlightStatusContainer.js';


const propTypes = {
	match: {
		params: {
			flightId: PropTypes.string.isRequired
		}
	}
};

class FlightStatus extends Component {

	render () {
		let flightId = this.props.match.params.flightId;

		return (
			<section className='vertical-horizontal-center'>
				<div className='container-fluid container'>
					<div className='row'>
						<div className='col-sm-6 col-sm-offset-3'>
							<FlightStatusContainer flightId={flightId} />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

FlightStatus.propTyps = propTypes;

export default FlightStatus;
