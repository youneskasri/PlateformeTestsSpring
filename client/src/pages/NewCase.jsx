import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Axios from "../actions/axios";
import CKEditor from "react-ckeditor-component";

const BASE_URL = require("../params").serverBaseUrl;

export default class NewCase extends React.Component {

	state = {
		automated: false,
		redirection: null,
		steps: '<i>Etapes du test ...</i>'
	}

	toggleAutomated = (event) => {
		this.setState({ automated: !this.state.automated});
	}


	handleStepsChange =  ( event ) =>  {
		let steps = event.editor.getData();
		this.setState({ steps });
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let automated = this.state.automated;
		let objective = this.refs.objective.value;

		if ( automated === true) {
			// TODO
			alert('TODO');
		} else {
			let steps = this.state.steps;
			let inputs = this.refs.inputs.value;
			let expectedOutputs = this.refs.outputs.value;

			let { idProject, idPlan, idScenario } = this.props.match.params;

			console.log(automated, inputs, expectedOutputs, steps);

			Axios.post(`${BASE_URL}/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`, { objective, automated, inputs, expectedOutputs, steps } )
				.then(res => res.data)
				.then(testCase => {
					console.log(testCase);
					let redirection = (<Redirect to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${testCase.idTestCase}`} />);
					this.setState({ redirection });
				})
				.catch(err => alert(err.message));
		}
	}

	render(){

		let automatedTestForm = (
			<div className="form-inline mt-1">
			  <select name="" id="" className="form-control">
			  	<option value="">Action</option>
			  </select>
			  <input type="text" className="form-control" placeholder="#target"/>
			  <button type="submit" className="btn btn-info">Add</button>
			</div>
		);

		let manualTestForm =  (
			<div>
			    		<CKEditor 
		     				activeClass="p10" 
		       				content={this.state.steps} 
	    					events={{
		           				"change": this.handleStepsChange
              				}}
             			/>
				<div className="mb-3"></div>

				<div className="container-fluid">
					<div className="row p-0">
						<div className="col-6 p-0 pr-1">
							<textarea ref="inputs" className="form-control" placeholder="Inputs"></textarea>
						</div>
						<div className="col-6 p-0 pl-1">
							<textarea ref="outputs" className="form-control" placeholder="Expected Outputs" required></textarea>
						</div>
					</div>
				</div>
			</div>
		);

		let testCaseInputs = this.state.automated ?
			automatedTestForm : manualTestForm;

		let { idProject, idPlan, idScenario } = this.props.match.params;
		
		return (
			<div className="container">
				{ this.state.redirection }
				<div className="row mt-5">
					<div className="col-10 offset-1">
						<div className="card">
							<h5 className="card-header">
								New Test Case
								<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`}>
									<i className="fas fa-times"></i>
								</Link>
							</h5>
							<form className="card-body" onSubmit={this.handleSubmit}>
								<input ref="objective" type="text" className="form-control" placeholder="Objectif du test"/>
								<div className="mb-3"></div>
								
								<label className="mr-2">Automated ? </label> 
									<label className="switch">
									  <input type="checkbox" checked={this.state.automated} onChange={this.toggleAutomated} />
									  <span className="slider round"></span>
									  _
								</label>

								{ testCaseInputs }			

								<div className="mb-3"></div>
								<button className="btn mx-auto btn-info btn-block w-50">Save</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}