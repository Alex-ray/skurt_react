// Libraries
import React from 'react';
import $ from 'jquery';

// Components
import {Logo} from './../components/Logo.js';

// Containers
import FlightDelaySearchContainer from './../containers/FlightDelaySearchContainer.js';

class Dashboard extends React.Component {
	render () {
		return (
			<section className='vertical-horizontal-center'>
				<div className='container-fluid container'>
					<div className='row text-center dashboard-logo'>
						<Logo />
					</div>
					<FlightDelaySearchContainer />
				</div>
			</section>
		);
	}
}

export default Dashboard;
