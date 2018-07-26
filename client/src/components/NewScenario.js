import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

export default class NewScenario extends React.Component {

	state = {
		redirection: null
	}


	handleSubmit = (evt) => {
		evt.preventDefault();

		let title = this.refs.title.value;
		let description = this.refs.description.value;

		console.log('POST Scenario Data', title, description);

		let { idProject, idPlan } = this.props.match.params;
		
		Axios.post(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios`, { title, description })
			.then(res => res.data)
			.then(scenario => {
				console.log("Saved Scenario", scenario);
				if(scenario) {
					let redirection = ( <Redirect to={`/projects/${idProject}/plans/${idPlan}/scenarios/${scenario.idScenario}/cases`} /> );
					this.setState({ redirection });
				} else {
					console.log("Erreur")
				}
			}).catch(console.log);
	}


	render(){

		let { idProject, idPlan } = this.props.match.params;

		return (
			<div className="card">
				
				{ this.state.redirection }
				
				<h5 className="card-header">
					New Test Scenario
					<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/scenarios`}>
						<i className="fas fa-times"></i>
					</Link>
				</h5>
				<form className="card-body" onSubmit={this.handleSubmit}>
					<input ref="title" type="text" className="form-control" placeholder="Test Scenario Title" required/>
					<div className="mb-3"></div>				
					<textarea ref="description" className="form-control" placeholder="Test Scenario description"></textarea>
					<div className="mb-3"></div>
					<button className="btn mx-auto btn-block w-50">Save</button>
				</form>
			</div>
		);
	}
}
