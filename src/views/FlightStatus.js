// Libraries
import React, {Component} from 'react';
import $ from 'jquery';

// Components
import {Logo} from './../components/Logo.js';

class FlightStatus extends Component {
	render () {
		return (
			<section className='vertical-horizontal-center'>
				<div className='container-fluid container'>
					<div className='row text-center dashboard-logo'></div>
				</div>
			</section>
		);
	}
}

export default FlightStatus;
