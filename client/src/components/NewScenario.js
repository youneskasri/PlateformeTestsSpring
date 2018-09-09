import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Axios from "../actions/axios";

import CKEditor from "react-ckeditor-component";

const BASE_URL = require("../params").serverBaseUrl;

export default class NewScenario extends React.Component {

	state = {
		redirection: null,
		description: '<i>Test Scenario description ...</i>'
	}


	handleSubmit = (evt) => {
		evt.preventDefault();

		let title = this.refs.title.value;
		let description = this.state.description;

		console.log('POST Scenario Data', title, description);

		let { idProject, idPlan } = this.props.match.params;
		
		Axios.post(`${BASE_URL}/${idProject}/plans/${idPlan}/scenarios`, { title, description })
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


	handleDescriptionChange =  ( event ) =>  {
		let description = event.editor.getData();
		this.setState({ description });
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
			    		<CKEditor 
		     				activeClass="p10" 
		       				content={this.state.description} 
	    					events={{
		           				"change": this.handleDescriptionChange
              				}}
             			/>
					<div className="mb-3"></div>
					<button className="btn mx-auto btn-info btn-block w-50">Save</button>
				</form>
			</div>
		);
	}
}
