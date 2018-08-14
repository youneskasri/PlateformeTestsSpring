import React from 'react';

const UserRow = (props) => {

	let { user } = props;

	let active = user.active ? <span className="text-success bg-light rounded px-2">Oui</span>
		: <span className="text-danger bg-light rounded px-2">Non</span>

	let role = "Testeur";
	if (user.role === "ARCHITECT") role = "Concepteur";
	else if (user.role === "ADMIN") role = "Admin";
	else if (user.role === "MANAGER") role = "Manager";


	return (
		<tr
			className={props.background}
			onMouseEnter={props.setSelectedUser}>
			<td>{ user.idUser }</td>
	        <td>{ user.firstName }</td>
	        <td>{ user.lastName }</td>
	        <td>{ user.email }</td>
	      	<td>{ role }</td>
	      	<td>{ active }</td>
	    </tr>
	);
}

export default UserRow;