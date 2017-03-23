// Libraries
import React from 'react';
import $ from 'jquery';

// Components
import {FlightDelaySearchForm} from './../components/FlightDelaySearchForm.js';
import {Logo} from './../components/Logo.js';

class Dashboard extends React.Component {
	render () {
		return (
			<section className='vertical-horizontal-center'>
				<div className='container-fluid container'>
					<div className='row text-center dashboard-logo'>
						<Logo />
					</div>
					<FlightDelaySearchForm />
				</div>
			</section>
		);
	}
}

export default Dashboard;
