import React from 'react';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
const BASE_URL = require("../params").serverBaseUrl;

const UserRow = (props) => {

	let { user } = props;
	return (
		<tr
			className={props.background}
			onMouseEnter={props.setSelectedUser}>
			<td>{ user.idUser }</td>
	        <td>{ user.firstName }</td>
	        <td>{ user.lastName }</td>
	        <td>{ user.email }</td>
	      	<td>{ user.role }</td>
	    </tr>
	);
}

const UsersTable = (props) => (
	<table className="table">
    <thead>
      <tr>
      	<th>N° User</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
    {
     	props.users.map(user => (
			<UserRow key={user.idUser}
				background={props.isSelected(user) ? "bg-info text-light" : ""}
				setSelectedUser={() => { props.setSelectedUser(user)}}
			 	user={user} />     		
    	))
    }
    </tbody>
  </table>
);

const ShowUser = (props) => {

	let { user } = props;

	if (!user ) return '';
	return (
		<div className="card">
			<div className="card-header bg-info text-light">
				{ 'User N°' + user.idUser }
				<a href="#" 
					onClick={props.handleClose}
					className="float-right text-light"><i className="fas fa-times"></i></a>
			</div>
			<div className="card-body bg-light">
				<div><span className="text-info font-weight-bold pr-5">Nom</span>{user.lastName}</div>
				<div><span className="text-info font-weight-bold pr-4">Prénom</span>{user.firstName}</div>
				<div><span className="text-info font-weight-bold pr-5">Email</span>{user.email}</div>
				<div><span className="text-info font-weight-bold pr-5">Role</span>{user.role}</div>
				<div><span className="text-info font-weight-bold pr-3">Compte </span> <span className="text-success">Actif</span></div>
			</div>
			<div className="card-footer bg-light">
				<div className="text-center">
					<button className="btn btn-warning btn-sm mx-1 "><i className="fas fa-user-slash"></i> Désactiver</button>
					<Link to={`/users/${user.idUser}/edit`} className="btn btn-info btn-sm mx-1"><i className="fas fa-user-edit"></i> Edit</Link>					
					<button onClick={props.handleDelete} className="btn btn-sm btn-danger m-0 mx-1"><i className="far fa-trash-alt"></i> Delete</button>
				</div>
			</div>
		</div>
	);
}

export default class Users extends React.Component {

	state = {
		users: [
			{	
				idUser: "001",
				firstName: "lolo",
				lastName: "lil",
				email: "lil@wayne.cpm",
				role: "ADMINo"
			},
			{	
				idUser: "002",
				firstName: "czefvaeo",
				lastName: "lcaecail",
				email: "lcail@caecayne.cpcem",
				role: "AceDMINo"
			}
		],
		selectedUser: null
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
				            users = users.filter(user => user.idUser !== selectedUser.idUser);
							selectedUser = null;
							this.setState({ users, selectedUser });
				            onClose()
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
							handleDelete={this.deleteSelectedUser} />
					</div>
				</div>				
			</div>
		);
	}
} 
