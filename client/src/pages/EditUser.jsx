import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from "axios";

const BASE_URL = require("../params").serverBaseUrl;

class EditUser extends React.Component {

	state = {
		redirection: null,
		user: {
			firstName: '',
			lastName: '',
			email: '',
			role: ''
		}
	}

	componentDidMount() {
		let { idUser } = this.props.match.params;
		
		Axios.get(`${BASE_URL}/users/${idUser}`)
		.then(res => res.data)
		.then(user => this.setState({ user }))
		.catch(console.log);
	}

	setUserRole = (event) => {
		let role = event.target.value;

		let { user } = this.state;
		user.role = role;

		this.setState({ user });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let { user } = this.state;
		
		let firstName = this.refs.firstName.value;
		let lastName = this.refs.lastName.value;
		let email = this.refs.email.value;
		let role = this.refs.role.value;

		Axios.patch(`${BASE_URL}/users/${user.idUser}`, { firstName, lastName, email, role })
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

		let { user } = this.state;

		return (
			<div className="container-fluid mt-5">
				{ redirection }
				<div className="row">
					<div className="offset-md-2 col-md-8">
						<div className="card">
							<div className="card-header bg-info text-center text-light">
								<h4>Editer l'utilisateur <Link to="/users" className="float-right text-light"><i className="fas fa-times"></i></Link></h4>
							</div>
							<div className="card-body">				
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label>Nom</label>
										<input type="text" ref="lastName" 
											defaultValue={user.lastName}
											placeholder="nom de l'utilisateur" className="form-control" required/>
									</div>	
									<div className="form-group">
										<label>Prénom</label>
										<input type="text" ref="firstName" 
											defaultValue={user.firstName}
											placeholder="prénom de l'utilisateur" className="form-control" required/>
									</div>	
									<div className="form-group">
										<label>Email</label>
										<input type="email" ref="email"
											disabled 
											defaultValue={user.email}
											placeholder="email de l'utilisateur" className="form-control" required/>
									</div>											
									<div className="form-group">
										<label>Role</label>
										<select ref="role" 
											value={user.role}
											onChange={this.setUserRole}
											className="form-control" name="" id="">
											<option key={1} value="TESTER">Testeur</option>														
											<option key={2} value="ARCHITECT">Concepteur</option>
											<option key={3} value="MANAGER">Manager</option>
											<option key={4} value="ADMIN">Admin</option>
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

export default EditUser;