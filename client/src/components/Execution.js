import React from "react";

const formatDate = require("../format-date");

const Execution = (props) => {


	let { idTestExecution, dateOfExecution, outputs,  remarks, status } = props.execution;

	return (

		<div className="card">
			<div className="card-header">
				Execution N°{idTestExecution} le { formatDate(dateOfExecution, "Do MMMM YYYY à HH:mm:s") }
				<a href="#" onClick={props.handleClose} className="float-right"><i class="far fa-times-circle"></i></a>
			</div>
			<div className="card-body">
				<div>Outputs = {outputs }</div>
				Status = { status === true ? 'PASSED' : 'DIDNT PASS'}
				{ 
					remarks ? 
					(
						<div>Remarks = {remarks}</div>
					)
					: ''
				}
			</div>
		</div>

	);
}


export default Execution;