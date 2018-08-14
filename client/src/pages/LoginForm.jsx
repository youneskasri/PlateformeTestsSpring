import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class LoginForm extends Component {

	state = {
		redirectToReferrer: false
	}


	onSubmit = (evt) => {
		evt.preventDefault();
		sessionStorage.setItem("token", "4fe-056-2cx");

		this.setState({ redirectToReferrer: true });
	}

	render() {

		const { from } = this.props.location.state || { from: { pathname: '/' } }
	    const { redirectToReferrer } = this.state

	    if (redirectToReferrer === true) {
	      return <Redirect to={from} />
	    }
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-6 offset-3 mt-5">
						<div className="card">
							<div className="card-header bg-info text-light font-weight-bold">
								<huge>Se Connecter</huge>
							</div>
							<div className="card-body">
								<form action="" onSubmit={this.onSubmit}>
									<div className="form-group">
										<label>Username</label>
										<input type="text" placeholder="username" className="form-control"/>
									</div>
									<div className="form-group">
										<label>Password</label>
										<input type="password" placeholder="password" className="form-control"/>								
									</div>
									<hr/>
									<button className="btn btn-block btn-info">Login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);	
	} 

}