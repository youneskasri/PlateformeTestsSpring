import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import AuthService from "../actions/auth";
import axios from "axios";

export default class LoginForm extends Component {

	state = {
		redirectToReferrer: false
	}


	onSubmit = (evt) => {
		evt.preventDefault();

		let email = this.refs.email.value;
		let password = this.refs.password.value;

		AuthService.login({ email, password })
		.then(result => {
			let token_role_firstName = result.split(',');
			let token = token_role_firstName[0];
			let role = token_role_firstName[1];
			let firstName = token_role_firstName[2];

			sessionStorage.setItem("role", role);
			sessionStorage.setItem("firstName", firstName);
			sessionStorage.setItem("token", token);

			console.log("Session storage", sessionStorage);

			axios.defaults.headers.common['Authorization'] = 'Token ' + sessionStorage.getItem('token');

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
								 Se Connecter 
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