import React from 'react';
import { Link } from "react-router-dom";

const NewPlan = (props) => (
	<div className="card">
		<h5 className="card-header">
			New Test Plan 
			<Link className="float-right text-info" to={`/projects/${props.match.params.idProject}`}>
				<i className="fas fa-times"></i>
			</Link>
		</h5>
		<form className="card-body">
			<input type="text" className="form-control" placeholder="Plan Title"/>
			<div className="mb-3"></div>
			<textarea className="form-control" placeholder="Test plan description"></textarea>
			<div className="mb-3"></div>
			<button className="btn mx-auto btn-block w-50">Save</button>
		</form>
	</div>
);

export default NewPlan;