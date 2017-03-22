import React from 'react';
import $ from 'jquery';

class Dashboard extends React.Component {
	render () {
		return (
			<section className='vertical-horizontal-center'>
				<div className='container-fluid container'>
					<div className='row text-center dashboard-logo'>
						<img src='images/logo.png' class="img-responsive" alt="Skurt"/>
					</div>
					<form role="form">
						<div className="row form-group">
							<div className='col-sm-6 col-sm-offset-3'>
								<input type="text" className="form-control" placeholder="Search Flight" />
							</div>
						</div>

						<div className='row text-center dashboard-form-action-group'>
							<button type="submit" className="btn btn-default">Search</button>
						</div>
					</form>
				</div>
			</section>
		);
	}
}

export default Dashboard;
