import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import AuthService from "../actions/auth";

export default class LoginForm extends Component {

	state = {
		redirectToReferrer: false
	}


	onSubmit = (evt) => {
		evt.preventDefault();

		let email = this.refs.email.value;
		let password = this.refs.password.value;

		AuthService.login({ email, password })
		.then(token => {
			sessionStorage.setItem("token", token);
			this.setState({ redirectToReferrer: true });
		}).catch(err => {
			console.log(err);
			alert(err.message);
		});
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
										<input type="email" ref="email" placeholder="email" className="form-control" required/>
									</div>
									<div className="form-group">
										<label>Password</label>
										<input type="password"  ref="password" placeholder="password" className="form-control" required/>								
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