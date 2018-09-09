import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from "../actions/axios";

const BASE_URL = require("../params").serverBaseUrl;

class NewUser extends React.Component {

	state = {
		redirection: null
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let firstName = this.refs.firstName.value;
		let lastName = this.refs.lastName.value;
		let email = this.refs.email.value;
		let password = this.refs.password.value;
		let role = this.refs.role.value;

		Axios.post(`${BASE_URL}/users`, { firstName, lastName, email, password, role })
		.then(res => res.data)
		.then(user => {
			console.log("Created user", user);
			let redirection = <Redirect to={`/users`} />
			this.setState({ redirection });
		})
		.catch(console.log);
	}

	render(){

		let { redirection } = this.state;

		return (
			<div className="container-fluid mt-5">
				{ redirection }
				<div className="row">
					<div className="offset-md-2 col-md-8">
						<div className="card">
							<div className="card-header bg-info text-center text-light">
								<h4>Nouvel utilisateur <Link to="/users" className="float-right text-light"><i className="fas fa-times"></i></Link></h4>
							</div>
							<div className="card-body">				
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label>Nom</label>
										<input type="text" ref="lastName" placeholder="nom de l'utilisateur" className="form-control" required/>
									</div>	
									<div className="form-group">
										<label>Prénom</label>
										<input type="text" ref="firstName" placeholder="prénom de l'utilisateur" className="form-control" required/>
									</div>	
									<div className="form-group">
										<label>Email</label>
										<input type="email" ref="email" placeholder="email de l'utilisateur" className="form-control" required/>
									</div>
									<div className="form-group">
										<label>Password</label>
										<input type="password" ref="password" placeholder="mot de passe" className="form-control" required/>
									</div>											
									<div className="form-group">
										<label>Role</label>
										<select ref="role" className="form-control" name="" id="">
											<option value="TESTER">Testeur</option>														
											<option value="ARCHITECT">Concepteur</option>
											<option value="MANAGER">Manager</option>
											<option value="ADMIN">Admin</option>
										</select>
									</div>					
									<button className="btn btn-info btn-block">Save</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
} 

export default NewUser;