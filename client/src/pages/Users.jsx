import React from 'react';
import { Link } from 'react-router-dom';
import Axios from "../actions/axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import UsersTable from "../components/UsersTable";
import ShowUser from "../components/ShowUser";

const BASE_URL = require("../params").serverBaseUrl;

export default class Users extends React.Component {

	state = {
		users: [
			{	
				idUser: "",
				firstName: "",
				lastName: "",
				email: "",
				role: ""
			}
		],
		selectedUser: null
	}

	componentWillMount() {

		console.log(sessionStorage.getItem('token'));
		console.log(sessionStorage.getItem('role'));
		console.log(sessionStorage.getItem('firstName'));

		Axios.get(`${BASE_URL}/users`)
		.then(res => res.data)
		.then(users => {
			console.log(users);
			this.setState({ users });
		}).catch(console.log);
	}

	setSelectedUser = (selectedUser) => { 
		this.setState({ selectedUser })
	}

	isSelected = (user) => {
		let selectedUser = this.state.selectedUser;

		return selectedUser && selectedUser === user;
	}

	deleteSelectedUser = () => {

		let { users, selectedUser } = this.state;

		confirmAlert({
	      title: 'Confirmer la suppression',
	      message: 'Are you sure to do this.',
	        customUI: ({ onClose }) => {
			    return (
			      <div className="bg-light p-4 pt-1 border rounded">
			        <h1 className="text-info">Are you sure?</h1>
			        <hr/>
			        <p>You want to delete this file?</p>
			        <div className="btn-group ml-5 pr-3">
				        <button className="btn btn-info" onClick={onClose}>No, don't</button>
				        <button className="btn btn-danger" onClick={() => {

				        	Axios.delete(`${BASE_URL}/users/${selectedUser.idUser}`)
				        	.then(res => res.data)
				        	.then(isDeleted => {
				        		if (isDeleted) {
				   		            users = users.filter(user => user.idUser !== selectedUser.idUser);
									selectedUser = null;
									this.setState({ users, selectedUser });
						            onClose()
				        		} else {
				        			alert("Not deleted :/");
				        		}
				        	}).catch(console.log);
				        }}>Yes, Delete it!</button>
			        </div>
			      </div>
			    )
			  }
	    });
		
	}

	hideUser = () => {
		this.setState({ selectedUser: null });
	}

	disableAccount = () => {
		let { selectedUser } = this.state;
		if (!selectedUser) return;

		Axios.post(`${BASE_URL}/users/${selectedUser.idUser}/disable`)
		.then(res => res.data)
		.then(user => {
			selectedUser.active = user.active;
			this.setState({ selectedUser });
		}).catch(console.log);
	}

	enableAccount = () => {
		let { selectedUser } = this.state;
		if (!selectedUser) return;

		Axios.post(`${BASE_URL}/users/${selectedUser.idUser}/enable`)
		.then(res => res.data)
		.then(user => {
			selectedUser.active = user.active;
			this.setState({ selectedUser });
		}).catch(console.log);
	}

	render() {

		let { users, selectedUser } = this.state;
		return (
			<div className="container mt-4">
				<h1>Gestion des utilisateurs <small><Link to="/users/new" className="float-right text-info"><i className="fas fa-user-plus"></i> Add user</Link></small></h1>
				<hr/>
				<div className="row">
					<div className="col-md-8">
						<UsersTable users={users} 
							isSelected={this.isSelected} 
							setSelectedUser={this.setSelectedUser} />
					</div>
					<div className="col-md-4">
						<ShowUser user={selectedUser} 
							handleClose={this.hideUser}
							handleDelete={this.deleteSelectedUser}
							handleDisable={this.disableAccount}
							handleEnable={this.enableAccount}
						/>
					</div>
				</div>				
			</div>
		);
	}
} 
