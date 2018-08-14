import React from 'react';
import UserRow from "./UserRow";

const UsersTable = (props) => (
	<table className="table">
    <thead>
      <tr>
      	<th>N° User</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actif</th>
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
)

export default UsersTable;