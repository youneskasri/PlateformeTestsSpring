import React from "react";
import {Link} from "react-router-dom";

const ShowUser = (props) => {

	let { user } = props;
	if (!user ) return '';

	let active = user.active ? 
		<span className="text-success">Actif</span>
		: <span className="text-danger">Désactivé</span>

	let enableDisableButton = user.active ?
		<button onClick={props.handleDisable} className="btn btn-warning btn-sm mx-1 "><i className="fas fa-user-slash"></i> Désactiver</button>
		: <button onClick={props.handleEnable} className="btn btn-success btn-sm mx-1 "><i className="fas fa-user-check"></i> Activer</button>
		

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
				<div><span className="text-info font-weight-bold pr-3">Compte </span> {active}</div>
			</div>
			<div className="card-footer bg-light">
				<div className="text-center">
					{ enableDisableButton }
					<Link to={`/users/${user.idUser}/edit`} className="btn btn-info btn-sm mx-1"><i className="fas fa-user-edit"></i> Edit</Link>					
					<button onClick={props.handleDelete} className="btn btn-sm btn-danger m-0 mx-1"><i className="far fa-trash-alt"></i> Delete</button>
				</div>
			</div>
		</div>
	);
}

export default ShowUser;