import React from 'react';
import { Link } from "react-router-dom";

export default class NewScenario extends React.Component {

	state = {

	}

	render(){
		return (
			<div className="card">
				<h5 className="card-header">
					New Test Scenario
					<Link className="float-right text-info" to={`/projects/${this.props.match.params.idProject}/plans/${this.props.match.params.idPlan}/scenarios`}>
						<i className="fas fa-times"></i>
					</Link>
				</h5>
				<form className="card-body">
					<input type="text" className="form-control" placeholder="Test Scenario Title"/>
					<div className="mb-3"></div>
					<input type="text" className="form-control" placeholder="Test Scenario Description"/>

					<div className="mb-3"></div>
					<button className="btn mx-auto btn-block w-50">Save</button>
				</form>
			</div>
		);
	}
}
