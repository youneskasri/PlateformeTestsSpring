import React from "react";

const Execution = (props) => {


	let { idTestExecution, dateOfExecution, remarks, status } = props.execution;

	return (

		<div className="card">
			<div className="card-header">
				Execution N°{idTestExecution} At { dateOfExecution }
			</div>
			<div className="card-body">
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